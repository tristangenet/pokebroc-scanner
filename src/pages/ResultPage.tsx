import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import CardInfo from '../components/CardInfo';
import AuthenticityIndicator from '../components/AuthenticityIndicator';
import { AuthenticityStatus } from '../utils/fakeDetector';
import { useAuth } from '../context/AuthContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export default function ResultPage() {
  const location = useLocation();
  const { user } = useAuth();
  const [prices, setPrices] = useState<Record<string, { stats: { low: number; avg: number; high: number } | null }>>({});
  const [recommended, setRecommended] = useState<number | null>(null);
  const card = location.state as
    | {
        name: string;
        set: string;
        number: string;
        image: string;
        rarity: string;
        authenticity?: AuthenticityStatus;
      }
    | undefined;

  useEffect(() => {
    if (!user || !card || !db) return;
    addDoc(collection(db, 'users', user.uid, 'history'), {
      name: card.name,
      set: card.set,
      number: card.number,
      image: card.image,
      rarity: card.rarity,
      authenticity: card.authenticity ?? 'unknown',
      createdAt: serverTimestamp(),
      favorite: false,
    });
  }, [user, card]);

  useEffect(() => {
    if (!card) return;
    fetch(`/estimate?card=${encodeURIComponent(card.name)}`)
      .then((r) => r.json())
      .then((data) => {
        setPrices(data);
        const lows = Object.values(data)
          .map((p: any) => p.stats?.low)
          .filter((n) => typeof n === 'number') as number[];
        if (lows.length) {
          const min = Math.min(...lows);
          setRecommended(parseFloat((min * 0.8).toFixed(2))); // 20% margin
        }
      });
  }, [card]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-white">
      <Navbar />
      <div className="p-4 text-center space-y-4 max-w-md mx-auto">
        <h1 className="text-xl font-semibold">Résultat du scan</h1>
        {card ? (
          <>
            <CardInfo
              name={card.name}
              set={card.set}
              number={card.number}
              image={card.image}
              rarity={card.rarity}
            />
            <AuthenticityIndicator status={card.authenticity ?? 'unknown'} />
            {Object.keys(prices).length > 0 && (
              <table className="w-full text-sm border mt-2">
                <thead>
                  <tr>
                    <th>Plateforme</th>
                    <th>Bas</th>
                    <th>Moyen</th>
                    <th>Haut</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(prices).map(([plat, val]) =>
                    val.stats ? (
                      <tr key={plat}>
                        <td>{plat}</td>
                        <td>€{val.stats.low.toFixed(2)}</td>
                        <td>€{val.stats.avg.toFixed(2)}</td>
                        <td>€{val.stats.high.toFixed(2)}</td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
            )}
            {recommended !== null && (
              <p className="mt-2 font-semibold">Prix d'achat conseillé : €{recommended.toFixed(2)}</p>
            )}
          </>
        ) : (
          <p>Aucune carte trouvée.</p>
        )}
        <Link to="/" className="text-accent underline block">Retour à l'accueil</Link>
      </div>
    </div>
  );
}
