export interface SampleCard {
  name: string;
  set: string;
  number: string;
  imagePath: string;
}

const sampleCards: SampleCard[] = [
  {
    name: 'Charizard',
    set: 'Base',
    number: '4',
    imagePath: '/card_samples/charizard_base1_4.png',
  },
  {
    name: 'Pikachu',
    set: 'Base',
    number: '58',
    imagePath: '/card_samples/pikachu_base1_58.png',
  },
];

interface LoadedSample {
  card: SampleCard;
  data: number[];
}

let loaded: LoadedSample[] | null = null;
const SIZE = 64;

async function loadSamples() {
  if (loaded) return;
  loaded = [];
  for (const card of sampleCards) {
    const img = new Image();
    img.src = card.imagePath;
    await img.decode();
    const canvas = document.createElement('canvas');
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext('2d');
    if (!ctx) continue;
    ctx.drawImage(img, 0, 0, SIZE, SIZE);
    const data = ctx.getImageData(0, 0, SIZE, SIZE).data;
    const gray: number[] = [];
    for (let i = 0; i < data.length; i += 4) {
      gray.push((data[i] + data[i + 1] + data[i + 2]) / 3 / 255);
    }
    loaded.push({ card, data: gray });
  }
}

function getImageArray(source: HTMLCanvasElement): number[] {
  const tmp = document.createElement('canvas');
  tmp.width = SIZE;
  tmp.height = SIZE;
  const ctx = tmp.getContext('2d');
  if (!ctx) return [];
  ctx.drawImage(source, 0, 0, SIZE, SIZE);
  const data = ctx.getImageData(0, 0, SIZE, SIZE).data;
  const gray: number[] = [];
  for (let i = 0; i < data.length; i += 4) {
    gray.push((data[i] + data[i + 1] + data[i + 2]) / 3 / 255);
  }
  return gray;
}

function mse(a: number[], b: number[]): number {
  if (a.length !== b.length) return Infinity;
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    const diff = a[i] - b[i];
    sum += diff * diff;
  }
  return sum / a.length;
}

export async function matchCardImage(canvas: HTMLCanvasElement) {
  await loadSamples();
  if (!loaded) return null;
  const arr = getImageArray(canvas);
  let best: { card: SampleCard; score: number } | null = null;
  for (const sample of loaded) {
    const score = mse(arr, sample.data);
    if (!best || score < best.score) {
      best = { card: sample.card, score };
    }
  }
  if (best && best.score < 0.02) {
    return best.card;
  }
  return null;
}
