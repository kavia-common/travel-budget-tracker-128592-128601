import React from 'react';
import { useAuth } from '../../services/auth/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Card from '../../components/common/Card';

/**
 * PUBLIC_INTERFACE
 * Dashboard landing page showing a placeholder summary.
 * Sets up structure for future charts/infographics with card-based layout.
 */
export default function DashboardPage() {
  const { user } = useAuth();
  const { theme } = useTheme();

  return (
    <section className="container stack-lg">
      <header className="stack-sm">
        <h1>Welcome {user?.name || 'Traveler'} 👋</h1>
        <p>Theme: <strong>{theme}</strong></p>
      </header>

      <div className="grid grid-3">
        <Card title="Trip Overview" subtitle="Budgets and status" gradient variant="teal">
          <p>This is a placeholder dashboard. Charts and budgets will live here.</p>
        </Card>

        <Card title="Spending by Category" subtitle="Recent trip" variant="peach">
          <div className="badge">Coming soon: donut chart</div>
        </Card>

        <Card title="Alerts & Tips" subtitle="Stay on track" variant="sun">
          <ul className="stack-sm" role="list">
            <li>Set a daily budget for food</li>
            <li>Watch transport costs in Tokyo</li>
          </ul>
        </Card>
      </div>
    </section>
  );
}
