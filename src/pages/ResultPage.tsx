import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CardInfo from '../components/CardInfo';

export default function ResultPage() {
  const location = useLocation();
  const card = location.state as
    | { name: string; set: string; number: string; image: string; rarity: string }
    | undefined;

  return (
    <div>
      <Navbar />
      <div className="p-4 text-center space-y-4">
        <h1 className="text-xl font-semibold">Résultat du scan</h1>
        {card ? (
          <CardInfo
            name={card.name}
            set={card.set}
            number={card.number}
            image={card.image}
            rarity={card.rarity}
          />
        ) : (
          <p>Aucune carte trouvée.</p>
        )}
        <Link to="/" className="text-blue-600 underline block">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
