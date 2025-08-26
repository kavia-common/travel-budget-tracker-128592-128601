import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import './root-layout.css';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../services/auth/AuthContext';

export default function RootLayout() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="brand">Trip Tracker</div>
        <nav className="nav">
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/trips">Trips</NavLink>
          <NavLink to="/expenses/add">Add Expense</NavLink>
        </nav>
        <div className="spacer" />
        <div className="panel">
          <button className="btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
          {user && (
            <button className="btn secondary" onClick={logout} style={{ marginTop: 8 }}>
              Logout
            </button>
          )}
        </div>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
