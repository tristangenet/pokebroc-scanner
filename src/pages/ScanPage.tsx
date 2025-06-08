import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import FakeAlert from '../components/FakeAlert';
import Tesseract from 'tesseract.js';
import { detectCounterfeit, AuthenticityStatus } from '../utils/fakeDetector';

interface CardResult {
  name: string;
  set: string;
  number: string;
  image: string;
  rarity: string;
  authenticity: AuthenticityStatus;
}

export default function ScanPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ocrText, setOcrText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [manualName, setManualName] = useState('');
  const [manualSet, setManualSet] = useState('');
  const [manualNumber, setManualNumber] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function enableCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setError("Accès à la caméra impossible");
      }
    }
    enableCamera();
  }, []);

  function cleanText(text: string): string {
    return text.replace(/[^a-zA-Z0-9 ]/g, ' ').split('\n')[0].trim();
  }

  async function fetchCard(name?: string, set?: string, number?: string): Promise<CardResult | null> {
    const qParts = [] as string[];
    if (name) qParts.push(`name:"${name}"`);
    if (set) qParts.push(`set.name:"${set}"`);
    if (number) qParts.push(`number:"${number}"`);
    const q = qParts.join(' ');
    const resp = await fetch(
      `https://api.pokemontcg.io/v2/cards?q=${encodeURIComponent(q)}&pageSize=1`
    );
    const json = await resp.json();
    const card = json.data?.[0];
    if (!card) return null;
    return {
      name: card.name,
      set: card.set.series,
      number: card.number,
      image: card.images.small,
      rarity: card.rarity || '',
      authenticity: 'unknown',
    };
  }

  async function searchManual() {
    setLoading(true);
    setError('');
    try {
      const card = await fetchCard(manualName, manualSet, manualNumber);
      if (card) {
        navigate('/result', { state: { ...card, authenticity: 'unknown' } });
      } else {
        setError('Carte non trouvée');
      }
    } finally {
      setLoading(false);
    }
  }

  async function capture() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    setLoading(true);
    setError('');
    try {
      const { data } = await Tesseract.recognize(
        canvas.toDataURL('image/png'),
        'eng'
      );
      setOcrText(data.text);
      const cleaned = cleanText(data.text);
      const card = await fetchCard(cleaned);
      let authenticity: AuthenticityStatus = 'unknown';
      try {
        authenticity = await detectCounterfeit(canvas);
      } catch (e) {
        console.error('Authenticity check failed', e);
      }
      if (card) {
        navigate('/result', { state: { ...card, authenticity } });
      } else {
        setError('Carte non trouvée');
      }
    } catch (e) {
      setError('Erreur OCR');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-white">
      <Navbar />
      <div className="p-4 text-center space-y-4 max-w-md mx-auto">
        <h1 className="text-xl font-semibold">Scanner une carte</h1>
        {error && <FakeAlert message={error} />}
        <video
          ref={videoRef}
          autoPlay
          className="mx-auto w-full max-w-xs bg-black rounded"
        />
        <button
          onClick={capture}
          className="px-4 py-2 bg-accent text-white rounded shadow"
        >
          Prendre une photo
        </button>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Nom"
            value={manualName}
            onChange={(e) => setManualName(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Série"
            value={manualSet}
            onChange={(e) => setManualSet(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Numéro"
            value={manualNumber}
            onChange={(e) => setManualNumber(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={searchManual}
            className="px-4 py-2 bg-accent text-white rounded shadow w-full"
          >
            Rechercher
          </button>
        </div>
        <canvas ref={canvasRef} className="hidden" />
        {loading && <p>Analyse en cours...</p>}
        {ocrText && (
          <div className="mt-4">
            <h2 className="font-semibold">Texte détecté :</h2>
            <pre className="whitespace-pre-wrap text-left">{ocrText}</pre>
          </div>
        )}
        <Link to="/" className="text-accent underline block">Retour à l'accueil</Link>
      </div>
    </div>
  );
}
