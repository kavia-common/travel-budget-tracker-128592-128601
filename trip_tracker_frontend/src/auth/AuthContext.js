import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

// PUBLIC_INTERFACE
export const AuthContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * AuthProvider wraps the app providing:
 * - Firebase Auth user (or null)
 * - Demo mode toggle (bypasses auth for testing)
 * - Methods: signInWithGoogle, signOutUser
 */
export function AuthProvider({ children }) {
  const [firebaseReady, setFirebaseReady] = useState(false);
  const [user, setUser] = useState(null);
  const [demoMode, setDemoMode] = useState(true); // default true for easy testing without env

  // Initialize Firebase only if envs exist
  useEffect(() => {
    const cfg = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY || undefined,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || undefined,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || undefined,
      appId: process.env.REACT_APP_FIREBASE_APP_ID || undefined,
      measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || undefined
    };
    const hasConfig = !!(cfg.apiKey && cfg.authDomain && cfg.projectId && cfg.appId);
    if (!hasConfig) {
      console.warn('Firebase config missing. Running in Demo Mode. Provide .env to enable Auth.');
      setFirebaseReady(false);
      return;
    }
    try {
      const app = initializeApp(cfg);
      const auth = getAuth(app);
      onAuthStateChanged(auth, (u) => {
        setUser(u);
      });
      setFirebaseReady(true);
    } catch (e) {
      console.error('Failed to init Firebase, staying in Demo Mode', e);
      setFirebaseReady(false);
    }
  }, []);

  const signInWithGoogle = async () => {
    if (!firebaseReady) {
      setDemoMode(true);
      setUser({ displayName: 'Demo User', email: 'demo@example.com', uid: 'demo' });
      return;
    }
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signOutUser = async () => {
    if (!firebaseReady) {
      setUser(null);
      return;
    }
    const auth = getAuth();
    await signOut(auth);
  };

  const toggleDemoMode = () => setDemoMode((v) => !v);

  const value = useMemo(() => ({
    user,
    firebaseReady,
    demoMode,
    signInWithGoogle,
    signOutUser,
    toggleDemoMode
  }), [user, firebaseReady, demoMode]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// PUBLIC_INTERFACE
export const useAuth = () => useContext(AuthContext);
