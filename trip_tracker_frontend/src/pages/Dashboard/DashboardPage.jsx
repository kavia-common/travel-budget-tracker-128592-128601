import React from 'react';
import { useAuth } from '../../services/auth/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Card from '../../components/common/Card';
import InfographicPlaceholders, { DonutChartPlaceholder, BarChartPlaceholder, TrendLinePlaceholder } from '../../components/common/InfographicPlaceholders';

/**
 * PUBLIC_INTERFACE
 * Dashboard landing page with card-based analytics placeholders using the design system.
 * Shows:
 * - Hero overview card
 * - Two analytics cards with SVG placeholders
 * - Tips/alerts card
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
        <Card title="Trip Overview" subtitle="Budgets and status" gradient variant="teal" className="stack-sm">
          <p>This is your dashboard. Visuals below illustrate where charts and summaries will appear.</p>
          <div className="grid grid-3">
            <div className="stack-sm" style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
              <DonutChartPlaceholder />
              <span className="badge">Split by Category</span>
            </div>
            <div className="stack-sm">
              <BarChartPlaceholder />
              <span className="badge peach">Weekly Spend</span>
            </div>
            <div className="stack-sm">
              <TrendLinePlaceholder />
              <span className="badge sun">Budget Progress</span>
            </div>
          </div>
        </Card>

        <Card title="Spending by Category" subtitle="Recent trip" variant="peach">
          <div className="stack-sm" style={{ alignItems: 'center' }}>
            <DonutChartPlaceholder />
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
              Placeholder donut chart to represent category breakdown.
            </p>
          </div>
        </Card>

        <Card title="Alerts & Tips" subtitle="Stay on track" variant="sun">
          <ul className="stack-sm" role="list">
            <li>Set a daily budget for food</li>
            <li>Watch transport costs in Tokyo</li>
            <li>Turn on notifications to catch overspend early</li>
          </ul>
        </Card>
      </div>
    </section>
  );
}
