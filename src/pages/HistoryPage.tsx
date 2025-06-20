import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

interface ScanItem {
  id: string;
  name: string;
  favorite?: boolean;
  note?: string;
}

export default function HistoryPage() {
  const { user } = useAuth();
  const [history, setHistory] = useState<ScanItem[]>([]);

  useEffect(() => {
    if (!user || !db) return;
    const q = query(
      collection(db, 'users', user.uid, 'history'),
      orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, (snap) => {
      setHistory(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })));
    });
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/20 to-white">
        <Navbar />
        <div className="p-4 text-center max-w-md mx-auto">
          <p>Connectez-vous pour voir votre historique.</p>
        </div>
      </div>
    );
  }

  function toggleFav(item: ScanItem) {
    if (!db || !user) return;
    updateDoc(doc(db, 'users', user.uid, 'history', item.id), {
      favorite: !item.favorite,
    });
  }

  function updateNote(item: ScanItem, note: string) {
    if (!db || !user) return;
    updateDoc(doc(db, 'users', user.uid, 'history', item.id), { note });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-white">
      <Navbar />
      <div className="p-4 space-y-2 max-w-md mx-auto">
        <h1 className="text-xl font-semibold mb-4 text-center">
          Historique des scans
        </h1>
        {history.map((item) => (
          <div key={item.id} className="border p-2 mb-2 rounded">
            <div className="flex justify-between items-center">
              <p>{item.name}</p>
              <button
                onClick={() => toggleFav(item)}
                className="text-sm text-accent underline"
              >
                {item.favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              </button>
            </div>
            <textarea
              value={item.note || ''}
              onChange={(e) => updateNote(item, e.target.value)}
              placeholder="Notes personnelles"
              className="mt-1 w-full border rounded p-1 text-sm"
            />
          </div>
        ))}
        {!history.length && (
          <p className="text-center">Aucun historique pour le moment</p>
        )}
      </div>
    </div>
  );
}
