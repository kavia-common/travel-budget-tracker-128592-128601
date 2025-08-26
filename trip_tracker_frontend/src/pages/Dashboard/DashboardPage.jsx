import React from 'react';
import { useAuth } from '../../services/auth/AuthContext';
import { useTheme } from '../../context/ThemeContext';

/**
 * PUBLIC_INTERFACE
 * Dashboard landing page showing a placeholder summary.
 */
export default function DashboardPage() {
  const { user } = useAuth();
  const { theme } = useTheme();

  return (
    <section>
      <h1>Welcome {user?.name || 'Traveler'} 👋</h1>
      <p>Theme: <strong>{theme}</strong></p>
      <div className="card" style={{ marginTop: 16 }}>
        <h3>Your Overview</h3>
        <p>This is a placeholder dashboard. Charts and budgets will live here.</p>
      </div>
    </section>
  );
}
