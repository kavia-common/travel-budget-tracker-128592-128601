import React, { useMemo, useState } from 'react';
import Card from '../components/Card';
import Modal from '../components/Modal';
import QuickExpenseForm from '../components/QuickExpenseForm';
import { createTrip, listTrips, addExpense } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * HomePage provides a friendly starting point to:
 * - set up (book) a new trip with details (name, dates, currency, budget, participants, categories),
 * - optionally add one or more initial expenses as part of setup,
 * - see a peek of existing trips (if any) and jump to manage them.
 *
 * Layout uses pastel gradients, rounded cards, soft shadows, and is mobile-first.
 */
export default function HomePage() {
  const navigate = useNavigate();
  const trips = useMemo(() => listTrips(), []);
  const [step, setStep] = useState('form'); // 'form' | 'added' | 'done'
  const [tripDraft, setTripDraft] = useState({
    name: '',
    startDate: '',
    endDate: '',
    currency: 'USD',
    budget: '',
    participants: 'You',
    categories: 'Flights,Lodging,Food,Transport,Fun,Misc'
  });
  const [createdTrip, setCreatedTrip] = useState(null);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [addedCount, setAddedCount] = useState(0);

  const canCreate =
    tripDraft.name.trim().length > 0 &&
    tripDraft.startDate &&
    tripDraft.endDate &&
    !Number.isNaN(Number(tripDraft.budget || 0));

  const handleCreateTrip = (e) => {
    e?.preventDefault?.();
    if (!canCreate) return;
    const participants = tripDraft.participants.split(',').map(s => s.trim()).filter(Boolean);
    const categories = tripDraft.categories.split(',').map(s => s.trim()).filter(Boolean);
    const t = createTrip({
      ...tripDraft,
      budget: Number(tripDraft.budget || 0),
      participants,
      categories
    });
    setCreatedTrip(t);
    setStep('added');
  };

  const addInitialExpense = (payload) => {
    if (!createdTrip) return;
    addExpense(createdTrip.id, payload);
    setAddedCount(c => c + 1);
    setExpenseModalOpen(false);
  };

  const finishSetup = () => {
    setStep('done');
    if (createdTrip) {
      navigate(`/trips/${createdTrip.id}`);
    } else {
      navigate('/trips');
    }
  };

  return (
    <div className="container">
      <div className="grid">
        <Card
          gradient
          title="Plan your next trip"
          subtitle="Set up a trip, invite participants, and seed initial expenses."
          toolbar={createdTrip ? (
            <div className="toolbar">
              <button className="btn accent" onClick={() => setExpenseModalOpen(true)}>+ Add an expense</button>
              <button className="btn" onClick={finishSetup}>Done</button>
            </div>
          ) : null}
        >
          {!createdTrip && (
            <form onSubmit={handleCreateTrip} style={{ display: 'grid', gap: 10 }}>
              <input
                className="input"
                placeholder="Trip name (e.g., Bali Getaway)"
                value={tripDraft.name}
                onChange={e => setTripDraft({ ...tripDraft, name: e.target.value })}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div style={{ display: 'grid', gap: 6 }}>
                  <label>Start date</label>
                  <input
                    className="input"
                    type="date"
                    value={tripDraft.startDate}
                    onChange={e => setTripDraft({ ...tripDraft, startDate: e.target.value })}
                  />
                </div>
                <div style={{ display: 'grid', gap: 6 }}>
                  <label>End date</label>
                  <input
                    className="input"
                    type="date"
                    value={tripDraft.endDate}
                    onChange={e => setTripDraft({ ...tripDraft, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div style={{ display: 'grid', gap: 6 }}>
                  <label>Currency</label>
                  <input
                    className="input"
                    placeholder="Currency (e.g., USD, EUR)"
                    value={tripDraft.currency}
                    onChange={e => setTripDraft({ ...tripDraft, currency: e.target.value })}
                  />
                </div>
                <div style={{ display: 'grid', gap: 6 }}>
                  <label>Budget</label>
                  <input
                    className="input"
                    placeholder="Total budget"
                    inputMode="decimal"
                    value={tripDraft.budget}
                    onChange={e => setTripDraft({ ...tripDraft, budget: e.target.value })}
                  />
                </div>
              </div>
              <div style={{ display: 'grid', gap: 6 }}>
                <label>Participants</label>
                <input
                  className="input"
                  placeholder="Comma separated (e.g., You, Alice, Bob)"
                  value={tripDraft.participants}
                  onChange={e => setTripDraft({ ...tripDraft, participants: e.target.value })}
                />
              </div>
              <div style={{ display: 'grid', gap: 6 }}>
                <label>Categories</label>
                <input
                  className="input"
                  placeholder="Comma separated categories"
                  value={tripDraft.categories}
                  onChange={e => setTripDraft({ ...tripDraft, categories: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                <button className="btn" type="submit" disabled={!canCreate}>
                  Create trip
                </button>
                <Link className="btn ghost" to="/trips">Manage trips</Link>
              </div>
            </form>
          )}

          {createdTrip && (
            <div style={{ display: 'grid', gap: 12 }}>
              <div className="card" style={{ padding: 12 }}>
                <div style={{ display: 'grid', gap: 6 }}>
                  <div style={{ fontWeight: 800 }}>{createdTrip.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                    {createdTrip.startDate} → {createdTrip.endDate} · {createdTrip.currency}
                  </div>
                  <div style={{ fontSize: 14 }}>
                    Budget: <strong>{createdTrip.currency} {createdTrip.budget.toLocaleString()}</strong>
                  </div>
                </div>
              </div>
              <div style={{ display: 'grid', gap: 8 }}>
                <div style={{ color: 'var(--muted)' }}>
                  Add initial expenses now, or finish setup and add later from the trip page.
                </div>
                <div className="toolbar">
                  <button className="btn accent" onClick={() => setExpenseModalOpen(true)}>+ Add expense</button>
                  <button className="btn" onClick={finishSetup}>Finish setup ({addedCount} added)</button>
                </div>
              </div>
            </div>
          )}
        </Card>

        <div className="grid grid-2">
          <Card title="Your recent trips" subtitle="Open an existing trip or continue planning.">
            <div style={{ display: 'grid', gap: 8 }}>
              {!trips.length && <div style={{ color: 'var(--muted)' }}>No trips yet. Create your first one above.</div>}
              {trips.map(t => (
                <div key={t.id} className="card" style={{ padding: 12 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <div style={{ fontWeight: 800 }}>
                      <Link to={`/trips/${t.id}`}>{t.name}</Link>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                      {t.startDate} → {t.endDate}
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                      <Link className="btn ghost" to={`/trips/${t.id}`}>Open</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Tips for a smooth start" subtitle="You can update these any time.">
            <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7 }}>
              <li>Set a realistic budget for the whole trip.</li>
              <li>Invite participants so splitting works from day one.</li>
              <li>Customize spending categories to match your plans.</li>
              <li>Seed a few planned expenses (e.g., flights, hotel) up front.</li>
            </ul>
          </Card>
        </div>
      </div>

      <Modal
        open={expenseModalOpen}
        onClose={() => setExpenseModalOpen(false)}
        title="Add initial expense"
        footer={<button className="btn secondary" onClick={() => setExpenseModalOpen(false)}>Close</button>}
      >
        {createdTrip && (
          <QuickExpenseForm trip={createdTrip} onSubmit={addInitialExpense} />
        )}
      </Modal>
    </div>
  );
}
