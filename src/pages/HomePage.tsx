import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-white">
      <Navbar />
      <div className="p-4 text-center space-y-4 max-w-md mx-auto">
        <h1 className="text-3xl font-semibold">PokéBroc Scanner</h1>
        <p className="mb-4">Scannez vos cartes Pokémon directement depuis votre navigateur.</p>
        <Link to="/scan" className="inline-block px-4 py-2 bg-accent text-white rounded shadow">
          Commencer un scan
        </Link>
      </div>
    </div>
  );
}
