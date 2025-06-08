import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PriceBox from '../components/PriceBox';

interface Stats {
  low: number;
  avg: number;
  high: number;
}

export default function PricePage() {
  const [params] = useSearchParams();
  const [stats, setStats] = useState<Stats | null>(null);
  const card = params.get('card') || '';

  useEffect(() => {
    if (!card) return;
    fetch(`/estimate?card=${encodeURIComponent(card)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.ebay && data.ebay.stats) {
          setStats(data.ebay.stats as Stats);
        }
      });
  }, [card]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-white">
      <Navbar />
      <div className="p-4 text-center max-w-md mx-auto space-y-2">
        <h1 className="text-xl font-semibold mb-4">Estimation de prix</h1>
        {stats ? (
          <>
            <PriceBox low={stats.low} high={stats.high} />
            <p className="mt-2">Prix moyen : €{stats.avg.toFixed(2)}</p>
          </>
        ) : (
          <p>Chargement...</p>
        )}
        <Link to="/" className="text-accent underline mt-4 block">Retour</Link>
      </div>
    </div>
  );
}
