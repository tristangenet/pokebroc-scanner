import { Link } from 'react-router-dom';

export default function PricePage() {
  return (
    <div className="p-4 text-center">
      <h1 className="text-xl font-semibold mb-4">Estimation de prix</h1>
      <p className="mb-4">(À venir)</p>
      <Link to="/" className="text-blue-600 underline">
        Retour
      </Link>
    </div>
  );
}
