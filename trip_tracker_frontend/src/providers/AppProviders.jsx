import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';

/**
 * PUBLIC_INTERFACE
 * Wraps the application with all global providers (Theme only; auth removed).
 */
export default function AppProviders({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
