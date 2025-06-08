import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase';

interface AuthContextType {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signInWithGoogle: async () => {},
  signInWithEmail: async () => {},
  signUpWithEmail: async () => {},
  signOut: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  async function signInWithGoogle() {
    await signInWithPopup(auth, new GoogleAuthProvider());
  }

  async function signInWithEmail(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function signUpWithEmail(email: string, password: string) {
    await createUserWithEmailAndPassword(auth, email, password);
  }

  async function signOut() {
    await fbSignOut(auth);
  }

  return (
    <AuthContext.Provider
      value={{ user, signInWithGoogle, signInWithEmail, signUpWithEmail, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
