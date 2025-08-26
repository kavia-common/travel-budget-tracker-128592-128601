import React, { useMemo, useState } from 'react';
import Card from '../../components/common/Card';
import { DonutChartPlaceholder, BarChartPlaceholder, TrendLinePlaceholder } from '../../components/common/InfographicPlaceholders';
import { formatCurrency } from '../../utils/format';

/**
 * PUBLIC_INTERFACE
 * Dashboard landing page showing personalized greeting, group/friends split control,
 * budget status and visual sections aligned with extracted patterns.
 */
export default function DashboardPage() {
  const displayName = 'Taha'; // Personalized demo per spec

  // Demo state for Group/Friends segmented control
  const [mode, setMode] = useState('group'); // 'group' | 'friends'

  // Placeholder demo budget data and computed memo for future live updates
  const budget = useMemo(() => ({
    total: 2500,
    spent: 940,
    currency: 'USD',
  }), []);
  const pctUsed = Math.min(100, Math.round((budget.spent / budget.total) * 100));

  return (
    <section className="container stack-lg">
      <header className="inline-between">
        <div className="stack-xs">
          <h1>Welcome {displayName} 👋</h1>
          <div className="avatar-chip" aria-label="User">
            <span className="avatar" />
            <span style={{ color: 'var(--color-text-muted)' }}>traveler@trip.app</span>
          </div>
        </div>
        <div className="segmented" role="group" aria-label="View mode">
          <button
            type="button"
            onClick={() => setMode('group')}
            aria-pressed={mode === 'group'}
          >
            Group
          </button>
          <button
            type="button"
            onClick={() => setMode('friends')}
            aria-pressed={mode === 'friends'}
          >
            Friends
          </button>
        </div>
      </header>

      <div className="grid-cards">
        {/* Budget & Spending */}
        <div className="col-8">
          <Card title="Budget & Spending" subtitle={`Mode: ${mode === 'group' ? 'Group Split' : 'Friends Split'}`} gradient variant="teal">
            <div className="stack-md">
              <div className="inline-between">
                <div className="inline">
                  <span className="badge">Budget</span>
                  <strong>{formatCurrency(budget.total, budget.currency)}</strong>
                </div>
                <div className="inline">
                  <span className="badge peach">Spent</span>
                  <strong>{formatCurrency(budget.spent, budget.currency)}</strong>
                </div>
                <div className="inline">
                  <span className="badge sun">Used</span>
                  <strong>{pctUsed}%</strong>
                </div>
              </div>

              {/* Progress */}
              <div style={{ height: 10, background: 'var(--color-surface-muted)', borderRadius: 999 }}>
                <div
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={pctUsed}
                  style={{
                    width: `${pctUsed}%`,
                    height: 10,
                    borderRadius: 999,
                    background: 'var(--gradient-accent)',
                    transition: 'width .3s ease',
                  }}
                />
              </div>

              {/* Category selector (mobile-inspired tokens) */}
              <div className="inline" aria-label="Filter by category">
                <div className="cat-token blue" title="Flights">✈️</div>
                <div className="cat-token teal" title="Ride">🚕</div>
                <div className="cat-token pink" title="Food">🍽️</div>
                <div className="cat-token green" title="Groceries">🛒</div>
                <div className="cat-token charcoal" title="Activities">🎭</div>
                <div className="cat-token orange" title="Drinks">☕</div>
                <div className="cat-token amber" title="Lodging">🏨</div>
              </div>

              {/* Charts trio */}
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
            </div>
          </Card>
        </div>

        {/* Spending by Category */}
        <div className="col-4">
          <Card title="Spending by Category" subtitle="Recent trip" variant="peach">
            <div className="stack-sm" style={{ alignItems: 'center' }}>
              <DonutChartPlaceholder />
              <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                Placeholder donut chart to represent category breakdown.
              </p>
            </div>
          </Card>
        </div>

        {/* Activity Suggestions - placeholder module */}
        <div className="col-6">
          <Card title="Activity Suggestions" subtitle="Coming soon" variant="sun">
            <ul className="stack-sm" role="list" aria-live="polite">
              <li>Explore free walking tours near your stay</li>
              <li>Try local street food markets tonight</li>
              <li>Discount museum entry on Wednesday</li>
            </ul>
          </Card>
        </div>

        {/* Personalized Recommendations - placeholder module */}
        <div className="col-6">
          <Card title="Personalized Recommendations" subtitle="Based on your patterns" variant="teal">
            <ul className="stack-sm" role="list" aria-live="polite">
              <li>You're under budget for Food — consider a special dinner 🍽️</li>
              <li>Transport spend rising — consider a day pass 🚇</li>
              <li>Look out for off-peak attractions to save more 🎟️</li>
            </ul>
          </Card>
        </div>

        {/* Alerts & Tips keeps alignment */}
        <div className="col-12">
          <Card title="Alerts & Tips" subtitle="Stay on track" variant="sun">
            <ul className="inline" role="list">
              <li>Set a daily budget for food</li>
              <li>Watch transport costs in Tokyo</li>
              <li>Turn on notifications to catch overspend early</li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}
