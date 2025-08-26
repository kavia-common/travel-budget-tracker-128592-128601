import React from 'react';
import { useParams } from 'react-router-dom';
import Card from '../../components/common/Card';
import { DonutChartPlaceholder, BarChartPlaceholder } from '../../components/common/InfographicPlaceholders';

/**
 * PUBLIC_INTERFACE
 * Displays trip detail using cards and infographic placeholders with consistent grid alignment.
 */
export default function TripDetailPage() {
  const { tripId } = useParams();
  return (
    <section className="container stack-lg">
      <header className="stack-xs">
        <h2>Trip Details</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>Trip ID: {tripId}</p>
      </header>

      <div className="grid-cards">
        <div className="col-8">
          <Card title="Budget Overview" subtitle="Progress and split" gradient variant="teal">
            <div className="grid grid-2">
              <div className="stack-sm" style={{ alignItems: 'center' }}>
                <DonutChartPlaceholder />
                <span className="badge">Categories</span>
              </div>
              <div className="stack-sm">
                <BarChartPlaceholder />
                <span className="badge peach">Recent spend</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="col-4">
          <Card title="Notes & Actions" subtitle="Quick tasks" variant="sun">
            <ul className="stack-sm" role="list">
              <li>Add last night dinner expense</li>
              <li>Adjust hotel budget (+$100)</li>
              <li>Invite travel partner to group</li>
            </ul>
            <div style={{ marginTop: 'var(--space-5)' }}>
              <a className="btn" href="/expenses/add">Quick add expense</a>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
