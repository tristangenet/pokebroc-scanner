import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FakeAlert from '../components/FakeAlert';

export default function ScanPage() {
  return (
    <div>
      <Navbar />
      <div className="p-4 text-center">
        <h1 className="text-xl font-semibold mb-4">Scanner une carte</h1>
        <FakeAlert message="Prise de photo non disponible" />
        <p className="mb-4">(Fonctionnalité de scan à implémenter)</p>
        <Link to="/" className="text-blue-600 underline">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
