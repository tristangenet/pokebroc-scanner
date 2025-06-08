import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CardInfo from '../components/CardInfo';

export default function ResultPage() {
  return (
    <div>
      <Navbar />
      <div className="p-4 text-center">
        <h1 className="text-xl font-semibold mb-4">Résultat du scan</h1>
        <CardInfo name="?" set="?" number="?" />
        <p className="mb-4">(À implémenter)</p>
        <Link to="/" className="text-blue-600 underline">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
