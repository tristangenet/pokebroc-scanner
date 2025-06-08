export type AuthenticityStatus = 'authentic' | 'unknown' | 'suspect';

async function detectLogo(base64: string): Promise<boolean> {
  const key = import.meta.env.VITE_GOOGLE_VISION_KEY;
  if (!key) return false;
  try {
    const res = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requests: [
            {
              image: { content: base64 },
              features: [{ type: 'LOGO_DETECTION', maxResults: 3 }],
            },
          ],
        }),
      }
    );
    const json = await res.json();
    const logos = json.responses?.[0]?.logoAnnotations || [];
    return logos.some((l: any) => /pok.*mon/i.test(l.description) && l.score > 0.6);
  } catch (e) {
    console.error('Vision API error', e);
    return false;
  }
}

function checkBorders(canvas: HTMLCanvasElement): boolean {
  const ctx = canvas.getContext('2d');
  if (!ctx) return false;
  const { width: w, height: h } = canvas;
  const m = Math.floor(Math.min(w, h) * 0.1);
  const sample = (x: number, y: number): number => {
    const d = ctx.getImageData(x, y, 1, 1).data;
    return (d[0] + d[1] + d[2]) / 3;
  };
  const left = sample(m / 2, h / 2);
  const right = sample(w - m / 2, h / 2);
  const top = sample(w / 2, m / 2);
  const bottom = sample(w / 2, h - m / 2);
  const diff = Math.abs(left - right) + Math.abs(top - bottom);
  return diff < 40;
}

export async function detectCounterfeit(
  canvas: HTMLCanvasElement
): Promise<AuthenticityStatus> {
  const base64 = canvas.toDataURL('image/png').replace(/^data:image\/png;base64,/, '');
  const [logo, centered] = await Promise.all([
    detectLogo(base64),
    Promise.resolve(checkBorders(canvas)),
  ]);

  if (logo && centered) return 'authentic';
  if (!logo || !centered) return 'suspect';
  return 'unknown';
}
