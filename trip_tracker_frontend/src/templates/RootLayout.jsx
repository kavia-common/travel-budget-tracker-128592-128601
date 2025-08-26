import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import './root-layout.css';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/common/Card';

export default function RootLayout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="brand">Trip Tracker</div>
        <nav className="nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/trips">Trips</NavLink>
          <NavLink to="/expenses/add">Add Expense</NavLink>
        </nav>
        <div className="spacer" />
        <Card padded className="panel" variant="teal" gradient title="Quick Actions" subtitle="Personalize your view">
          <div className="stack-sm">
            <button className="btn" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
        </Card>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
