import * as cheerio from 'cheerio';

// Node 18+ provides a global `fetch` implementation so we rely on that
// to avoid an additional dependency. If running on an older Node version,
// consider installing `node-fetch`.

async function fetchEbayPrices(query) {
  const url = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(query)}&LH_Sold=1&_sop=13&_ipg=10`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  const $ = cheerio.load(html);
  const prices = [];
  $('.s-item__price').each((i, el) => {
    if (i >= 10) return false;
    const text = $(el).text();
    const m = text.match(/([0-9,.]+)/);
    if (m) prices.push(parseFloat(m[1].replace(/,/g, '')));
  });
  return { prices, url };
}

async function fetchCardmarketPrices(query) {
  const url = `https://www.cardmarket.com/en/Pokemon/Products/Singles?searchString=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  const $ = cheerio.load(html);
  const prices = [];
  $('div.price-container').each((i, el) => {
    if (i >= 10) return false;
    const text = $(el).text();
    const m = text.match(/([0-9,.]+)\s*€/);
    if (m) prices.push(parseFloat(m[1].replace(/,/g, '.')));
  });
  return { prices, url };
}

async function fetchVintedPrices(query) {
  const url = `https://www.vinted.fr/vetements?search_text=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await res.text();
    const $ = cheerio.load(html);
    const prices = [];
    $('div.feed-grid__item div.tile__price').each((i, el) => {
      if (i >= 10) return false;
      const text = $(el).text();
      const m = text.match(/([0-9,.]+)/);
      if (m) prices.push(parseFloat(m[1].replace(/,/g, '.')));
    });
    return { prices, url };
  } catch (e) {
    return { prices: [], url };
  }
}

function computeStats(prices) {
  if (!prices.length) return null;
  const low = Math.min(...prices);
  const high = Math.max(...prices);
  const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
  return { low, avg, high };
}

export { fetchEbayPrices, fetchCardmarketPrices, fetchVintedPrices, computeStats };
