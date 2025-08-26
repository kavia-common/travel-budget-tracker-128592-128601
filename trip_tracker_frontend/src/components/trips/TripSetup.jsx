import React, { useMemo, useState } from 'react';
import Card from '../common/Card';
import './trip-setup.css';

/**
 * PUBLIC_INTERFACE
 * TripSetup displays a hero section with bold headline and a floating, rounded white card
 * containing a searchable/filterable form (trip name, total budget, optional daily budget,
 * start date, end date). It follows a modern, minimal travel booking look with subtle
 * background artwork, black bold headings, gray subtext, and small accent highlights.
 */
export default function TripSetup() {
  const [form, setForm] = useState({
    name: '',
    startDate: '',
    endDate: '',
    totalBudget: '',
    useDailyBudget: false,
    dailyBudget: '',
    invites: '',
  });

  const inviteLink = useMemo(() => 'https://trip.app/invite/abc123', []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  // PUBLIC_INTERFACE
  const createTrip = async (payload) => {
    /**
     * Stub for future API integration: create a trip and navigate to details.
     * Replace with apiPost('/trips', payload) and router navigation in future tasks.
     */
    return new Promise((res) => setTimeout(res, 250));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTrip(form);
    alert(`Trip created (stub): ${form.name || 'Untitled Trip'}`);
    setForm((f) => ({ ...f, name: '', totalBudget: '', dailyBudget: '', invites: '' }));
  };

  return (
    <section className="tt-setup-hero">
      {/* Subtle background art and soft gradient layer handled by CSS */}
      <div className="tt-setup-hero__bg" aria-hidden="true" />

      <div className="container tt-setup-hero__container">
        {/* Hero heading area with bold title and gray subtext */}
        <header className="tt-setup-hero__header stack-xs">
          <h1 className="tt-setup-hero__title">Trip Setup</h1>
          <p className="tt-setup-hero__subtitle">
            Plan your next adventure — pick dates, set a budget, and invite friends.
          </p>

          {/* Small accent highlights row (yellow, green, pink, blue) */}
          <ul className="tt-setup-accents" role="list" aria-label="Brand accents">
            <li className="dot dot-yellow" />
            <li className="dot dot-green" />
            <li className="dot dot-pink" />
            <li className="dot dot-blue" />
          </ul>
        </header>

        {/* Floating card that contains the form */}
        <Card className="tt-setup-card" padded variant="default">
          {/* Search bar style top row: name + total budget + daily toggle + daily budget */}
          <form onSubmit={handleSubmit} className="stack-md" aria-label="Create a trip">
            {/* Primary search/filter row */}
            <div className="tt-setup-row grid">
              {/* Trip name (grows) */}
              <div className="field field--grow">
                <input
                  name="name"
                  placeholder=" "
                  value={form.name}
                  onChange={handleChange}
                  aria-label="Trip name"
                  required
                />
                <span className="label">Trip name</span>
              </div>

              {/* Total budget */}
              <div className="field">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  name="totalBudget"
                  placeholder=" "
                  value={form.totalBudget}
                  onChange={handleChange}
                  aria-label="Total budget"
                  required
                />
                <span className="label">Total budget</span>
              </div>

              {/* Daily budget group: switch + input side by side as a single cohesive control */}
              <div
                className={`tt-setup-daily-group ${form.useDailyBudget ? 'enabled' : 'disabled'}`}
                role="group"
                aria-label="Daily budget"
              >
                <div className="tt-setup-daily-toggle" style={{ alignItems: 'center' }}>
                  <label className="switch" style={{ cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      name="useDailyBudget"
                      checked={form.useDailyBudget}
                      onChange={handleChange}
                      aria-label="Toggle daily budget"
                    />
                    <span className="slider" aria-hidden />
                  </label>
                  <span className="tt-setup-toggle-label">Set daily budget</span>
                </div>

                <div className="field tt-setup-daily-input" aria-disabled={!form.useDailyBudget}>
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.01"
                    name="dailyBudget"
                    placeholder=" "
                    value={form.dailyBudget}
                    onChange={handleChange}
                    aria-label="Daily budget"
                    disabled={!form.useDailyBudget}
                  />
                  <span className="label">Daily budget (optional)</span>
                </div>
              </div>
            </div>

            {/* Date range row */}
            <div className="tt-setup-row grid">
              <div className="field">
                <input
                  type="date"
                  name="startDate"
                  placeholder=" "
                  value={form.startDate}
                  onChange={handleChange}
                  aria-label="Start date"
                  required
                />
                <span className="label">Start date</span>
              </div>

              <div className="field">
                <input
                  type="date"
                  name="endDate"
                  placeholder=" "
                  value={form.endDate}
                  onChange={handleChange}
                  aria-label="End date"
                  required
                />
                <span className="label">End date</span>
              </div>

              <div className="field field--grow">
                <input
                  name="invites"
                  placeholder=" "
                  value={form.invites}
                  onChange={handleChange}
                  aria-label="Invite friends by email"
                />
                <span className="label">Invite friends (emails, comma-separated)</span>
              </div>
            </div>

            {/* Invite link quick copy */}
            <div className="inline-between tt-setup-link">
              <div className="card" title="Shareable invite link (placeholder)">
                <span className="tt-setup-link-label">Invite link</span>
                <code className="tt-setup-link-code">{inviteLink}</code>
              </div>
              <button
                type="button"
                className="btn secondary"
                onClick={() => navigator.clipboard?.writeText(inviteLink)}
              >
                Copy
              </button>
            </div>

            {/* Actions */}
            <div className="inline-between">
              <small className="tt-setup-footnote">
                You can edit details later from Trip details.
              </small>
              <div className="inline">
                <button
                  type="button"
                  className="btn secondary"
                  onClick={() =>
                    setForm({
                      name: '',
                      startDate: '',
                      endDate: '',
                      totalBudget: '',
                      useDailyBudget: false,
                      dailyBudget: '',
                      invites: '',
                    })
                  }
                >
                  Reset
                </button>
                <button className="btn" type="submit">
                  Create Trip
                </button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}
