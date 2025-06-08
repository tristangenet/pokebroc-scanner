import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold">PokéBroc</Link>
      <div className="space-x-4">
        <Link to="/history" className="hover:underline">Historique</Link>
        <Link to="/login" className="hover:underline">Connexion</Link>
      </div>
    </nav>
  );
}
