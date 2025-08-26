import React from 'react';
import { AuthProvider } from '../services/auth/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';

/**
 * PUBLIC_INTERFACE
 * Wraps the application with all global providers (Theme, Auth, etc).
 */
export default function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
