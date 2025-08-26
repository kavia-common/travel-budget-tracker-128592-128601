import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

/**
 * Lightweight placeholder for app authentication context.
 * This will later be swapped with Firebase/Auth integration.
 */

const AuthContext = createContext({
  user: null,
  loading: true,
  // PUBLIC_INTERFACE
  login: async (_email, _password) => {},
  // PUBLIC_INTERFACE
  logout: async () => {},
  // PUBLIC_INTERFACE
  signup: async (_email, _password) => {},
});

// PUBLIC_INTERFACE
export const AuthProvider = ({ children }) => {
  /** Provides authentication state and actions across the app. */
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate persisted session load
  useEffect(() => {
    const timer = setTimeout(() => {
      setUser(null); // start unauthenticated by default
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const login = async (email, _password) => {
    // Demo: simply set a user object
    setLoading(true);
    await new Promise((r) => setTimeout(r, 300));
    setUser({ id: 'demo-user', email, name: 'Demo User' });
    setLoading(false);
  };

  const signup = async (email, _password) => {
    // Demo: mimic account creation then login
    return login(email, _password);
  };

  const logout = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 200));
    setUser(null);
    setLoading(false);
  };

  const value = useMemo(() => ({ user, loading, login, logout, signup }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// PUBLIC_INTERFACE
export const useAuth = () => {
  /** Hook to access authentication context. */
  return useContext(AuthContext);
};
