import React, { useMemo, useState } from 'react';
import Card from '../common/Card';
import './trip-setup.css';

/**
 * PUBLIC_INTERFACE
 * TripSetup displays a prominent hero-style setup form to create a trip.
 * Fields: trip name, start/end dates, total budget, optional daily budget toggle and value,
 * invite friends (emails) and a generated invite link placeholder. No backend wiring; stubs only.
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

  const inviteLink = useMemo(
    () => 'https://trip.app/invite/abc123', // placeholder link
    []
  );

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
    // Reset minimal fields but leave dates to streamline multiple edits
    setForm((f) => ({ ...f, name: '', totalBudget: '', dailyBudget: '', invites: '' }));
  };

  return (
    <Card
      variant="teal"
      gradient
      padded
      title="Trip Setup"
      subtitle="Plan your next adventure: set dates, budget, and invite friends."
      /* To switch to the high-quality photo background, add 'use-photo' to the className below:
         className="tt-trip-setup use-photo"
         Ensure src/assets/trip-setup-bg-photo.jpg exists (copied from attachments). */
      className="tt-trip-setup"
      aria-label="Trip setup form"
    >
      {/* Explicit background image element to ensure visibility behind overlay and content */}
      <div
        className="tt-trip-setup__bg"
        aria-hidden="true"
      />
      <form onSubmit={handleSubmit} className="stack-md" style={{ width: '100%' }}>
        {/* Row: name + dates */}
        <div className="grid" style={{ gridTemplateColumns: '2fr 1fr 1fr' }}>
          <div className="field">
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
        </div>

        {/* Row: total budget + daily toggle + daily budget */}
        <div className="grid" style={{ gridTemplateColumns: '1fr auto 1fr', alignItems: 'center' }}>
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
            <span className="label">Total budget (e.g., 2500)</span>
          </div>

          <div className="inline" style={{ alignItems: 'center' }}>
            <label className="switch" style={{ cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="useDailyBudget"
                checked={form.useDailyBudget}
                onChange={handleChange}
                aria-label="Use daily budget"
              />
              <span className="slider" aria-hidden />
            </label>
            <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
              Use daily budget
            </span>
          </div>

          <div className="field" aria-disabled={!form.useDailyBudget}>
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
            <span className="label">Daily budget</span>
          </div>
        </div>

        {/* Row: invites + link */}
        <div className="grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
          <div className="field">
            <input
              name="invites"
              placeholder=" "
              value={form.invites}
              onChange={handleChange}
              aria-label="Invite friends by email"
            />
            <span className="label">Invite friends (emails, comma-separated)</span>
          </div>

          <div className="inline-between" style={{ gap: 'var(--space-2)' }}>
            <div
              className="card"
              style={{
                padding: '10px 12px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
              }}
              title="Shareable invite link (placeholder)"
            >
              <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                Invite link
              </span>
              <code style={{ fontSize: 'var(--font-size-sm)' }}>{inviteLink}</code>
            </div>
            <button
              type="button"
              className="btn secondary"
              onClick={() => navigator.clipboard?.writeText(inviteLink)}
            >
              Copy
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="inline-between">
          <small style={{ color: 'var(--color-text-muted)' }}>
            You can edit details later from Trip details.
          </small>
          <div className="inline">
            <button type="button" className="btn secondary" onClick={() => setForm({
              name: '',
              startDate: '',
              endDate: '',
              totalBudget: '',
              useDailyBudget: false,
              dailyBudget: '',
              invites: '',
            })}>
              Reset
            </button>
            <button className="btn" type="submit">Create Trip</button>
          </div>
        </div>
      </form>
    </Card>
  );
}
