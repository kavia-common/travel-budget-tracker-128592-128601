import React from 'react';
import Card from '../../components/common/Card';
import { formatCurrency } from '../../utils/format';

/**
 * PUBLIC_INTERFACE
 * Lists user trips using card layout.
 */
export default function TripsListPage() {
  const demoTrips = [
    { id: '1', name: 'Paris Getaway', budget: 1200, spent: 450 },
    { id: '2', name: 'Tokyo Adventure', budget: 2200, spent: 0 },
  ];

  return (
    <section className="container stack-lg">
      <header>
        <h2>Your Trips</h2>
      </header>

      <div className="grid grid-2">
        {demoTrips.map((t) => {
          const pct = Math.min(100, Math.round((t.spent / t.budget) * 100));
          return (
            <Card
              key={t.id}
              title={t.name}
              subtitle={`Budget: ${formatCurrency(t.budget)} • Spent: ${formatCurrency(t.spent)}`}
              variant="teal"
              gradient
              footer={
                <div className="stack-sm" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <a href={`/trips/${t.id}`} className="btn">Open</a>
                  <span className="badge sun">{pct}% used</span>
                </div>
              }
            >
              <div style={{ height: 8, background: 'var(--color-surface-muted)', borderRadius: 999 }}>
                <div
                  style={{
                    width: `${pct}%`,
                    height: 8,
                    borderRadius: 999,
                    background: 'var(--gradient-accent)',
                  }}
                />
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
