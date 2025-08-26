import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../services/auth/AuthContext';

/**
 * PUBLIC_INTERFACE
 * A simple route guard that redirects unauthenticated users to /login.
 * Replace the auth logic later when real Firebase/Auth is integrated.
 */
export default function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
}
