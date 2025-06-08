import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <div className="p-4 text-center space-y-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">PokéBroc Scanner</h1>
        <p className="mb-4">Scannez vos cartes Pokémon directement depuis votre navigateur.</p>
        <Link to="/scan" className="text-blue-600 underline">
          Commencer un scan
        </Link>
      </div>
    </div>
  );
}
