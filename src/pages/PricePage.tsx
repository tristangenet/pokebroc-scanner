import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PriceBox from '../components/PriceBox';

export default function PricePage() {
  return (
    <div>
      <Navbar />
      <div className="p-4 text-center">
        <h1 className="text-xl font-semibold mb-4">Estimation de prix</h1>
        <PriceBox low={0} high={0} />
        <p className="mb-4">(À venir)</p>
        <Link to="/" className="text-blue-600 underline">Retour</Link>
      </div>
    </div>
  );
}
