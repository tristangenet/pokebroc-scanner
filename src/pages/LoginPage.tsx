import { useState, FormEvent } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { user, signInWithGoogle, signInWithEmail, signUpWithEmail, signOut } =
    useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register, setRegister] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (register) {
      await signUpWithEmail(email, password);
    } else {
      await signInWithEmail(email, password);
    }
  }

  if (user) {
    return (
      <div>
        <Navbar />
        <div className="p-4 text-center space-y-4 max-w-sm mx-auto">
          <p className="mb-4">Connecté en tant que {user.email}</p>
          <button
            onClick={signOut}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="p-4 text-center space-y-4 max-w-sm mx-auto">
        <h1 className="text-xl font-semibold">Connexion</h1>
        <button
          onClick={signInWithGoogle}
          className="px-4 py-2 bg-red-600 text-white rounded w-full"
        >
          Connexion Google
        </button>
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="border p-2 rounded w-full"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
            className="border p-2 rounded w-full"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded w-full"
          >
            {register ? 'Créer un compte' : 'Se connecter'}
          </button>
        </form>
        <button
          onClick={() => setRegister(!register)}
          className="text-blue-600 underline"
        >
          {register ? 'J\'ai déjà un compte' : 'Créer un compte'}
        </button>
      </div>
    </div>
  );
}
