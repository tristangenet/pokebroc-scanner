import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, signOut } = useAuth();
  return (
    <nav className="bg-blue-600 text-white p-3 md:p-4 flex justify-between items-center text-sm md:text-base">
      <Link to="/" className="font-bold">PokéBroc</Link>
      <div className="space-x-2 md:space-x-4">
        <Link to="/history" className="hover:underline">Historique</Link>
        {user ? (
          <button onClick={signOut} className="hover:underline">Déconnexion</button>
        ) : (
          <Link to="/login" className="hover:underline">Connexion</Link>
        )}
      </div>
    </nav>
  );
}
