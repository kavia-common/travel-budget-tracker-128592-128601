import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

/**
 * Theme context to manage light/dark theme across the app.
 * Syncs with data-theme attribute used in CSS variables.
 */

const ThemeContext = createContext({
  theme: 'light',
  // PUBLIC_INTERFACE
  toggleTheme: () => {},
});

// PUBLIC_INTERFACE
export const ThemeProvider = ({ children }) => {
  /** Provides theme and toggleTheme across the app. */
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// PUBLIC_INTERFACE
export const useTheme = () => {
  /** Access theme context values. */
  return useContext(ThemeContext);
};
