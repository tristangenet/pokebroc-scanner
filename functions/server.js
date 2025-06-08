const express = require('express');
const cors = require('cors');
const { fetchEbayPrices, fetchCardmarketPrices, fetchVintedPrices, computeStats } = require('./priceScraper');

const app = express();
app.use(cors());
const port = process.env.PORT || 3001;

app.get('/estimate', async (req, res) => {
  const card = req.query.card;
  if (!card) return res.status(400).json({ error: 'Missing card parameter' });
  try {
    const [ebay, vinted, cardmarket] = await Promise.all([
      fetchEbayPrices(card),
      fetchVintedPrices(card),
      fetchCardmarketPrices(card)
    ]);
    res.json({
      ebay: { stats: computeStats(ebay.prices), source: ebay.url },
      vinted: { stats: computeStats(vinted.prices), source: vinted.url },
      cardmarket: { stats: computeStats(cardmarket.prices), source: cardmarket.url }
    });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch prices' });
  }
});

app.listen(port, () => console.log(`Price server listening on ${port}`));
