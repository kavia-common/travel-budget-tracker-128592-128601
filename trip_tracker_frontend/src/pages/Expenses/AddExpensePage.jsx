import React, { useMemo, useState } from 'react';
import Card from '../../components/common/Card';
import { FaBus, FaUtensils, FaHotel, FaLandmark, FaShoppingBag, FaEllipsisH } from 'react-icons/fa';

/**
 * PUBLIC_INTERFACE
 * Stylish Add Expense page featuring floating labels, pastel inputs, and category icons/chips.
 * Includes basic stubs for future integration (e.g., saveExpense).
 */
export default function AddExpensePage() {
  const categories = useMemo(() => ([
    { key: 'Transport', icon: <FaBus />, color: 'var(--color-primary)' },
    { key: 'Food', icon: <FaUtensils />, color: 'var(--color-secondary)' },
    { key: 'Stays', icon: <FaHotel />, color: 'var(--color-primary)' },
    { key: 'Attractions', icon: <FaLandmark />, color: 'var(--color-accent)' },
    { key: 'Shopping', icon: <FaShoppingBag />, color: 'var(--color-secondary)' },
    { key: 'Other', icon: <FaEllipsisH />, color: 'var(--color-text-muted)' },
  ]), []);

  const [form, setForm] = useState({
    description: '',
    amount: '',
    category: 'Food',
    notes: '',
  });

  const setCategory = (key) => setForm((f) => ({ ...f, category: key }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // PUBLIC_INTERFACE
  const saveExpense = async (payload) => {
    /** Stub for future API integration: persist expense and update store */
    // await apiPost('/expenses', payload)
    return new Promise((res) => setTimeout(res, 250));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveExpense(form);
    alert(`Expense added: ${form.description} - $${form.amount} (${form.category})`);
    setForm({ description: '', amount: '', category: form.category, notes: '' });
  };

  return (
    <section className="container stack-lg">
      <header className="stack-xs">
        <h2>Add Expense</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>Record a new expense with category tags and notes.</p>
      </header>

      <div className="grid-cards">
        {/* Left: Form */}
        <div className="col-8">
          <Card variant="peach" gradient title="Quick Add" subtitle="Record a new expense">
            <form onSubmit={handleSubmit} className="stack-md" style={{ maxWidth: 640 }}>
              {/* Category chips */}
              <div className="chips" aria-label="Choose a category">
                {categories.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    className={`chip ${form.category === c.key ? 'active' : ''}`}
                    onClick={() => setCategory(c.key)}
                    aria-pressed={form.category === c.key}
                    title={c.key}
                    style={{ color: c.color }}
                  >
                    <span style={{
                      width: 28, height: 28, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: '50%', background: 'var(--color-surface)', border: '1px solid var(--color-border)'
                    }}>{c.icon}</span>
                    {c.key}
                  </button>
                ))}
              </div>

              {/* Inputs with floating labels */}
              <div className="field">
                <input
                  name="description"
                  placeholder=" "
                  value={form.description}
                  onChange={handleChange}
                  required
                />
                <span className="label">Description</span>
              </div>

              <div className="inline" style={{ alignItems: 'stretch' }}>
                <div className="field" style={{ flex: 1 }}>
                  <input
                    name="amount"
                    type="number"
                    placeholder=" "
                    value={form.amount}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                  />
                  <span className="label">Amount</span>
                </div>
                <div className="field" style={{ width: 200 }}>
                  <select name="category" value={form.category} onChange={handleChange}>
                    {categories.map(c => <option key={c.key} value={c.key}>{c.key}</option>)}
                  </select>
                  <span className="label">Category</span>
                </div>
              </div>

              <div className="field">
                <textarea
                  name="notes"
                  placeholder=" "
                  rows={3}
                  value={form.notes}
                  onChange={handleChange}
                />
                <span className="label">Notes (optional)</span>
              </div>

              <div className="inline-between">
                <small style={{ color: 'var(--color-text-muted)' }}>
                  Tip: Categories also appear as filters and analytics later.
                </small>
                <button className="btn" type="submit">Add Expense</button>
              </div>
            </form>
          </Card>
        </div>

        {/* Right: Preview / future logic placeholder */}
        <div className="col-4">
          <Card variant="sun" title="Live Preview" subtitle="Future: real-time validation">
            <div className="stack-sm">
              <div className="inline">
                <strong>Category:</strong> <span className="badge">{form.category}</span>
              </div>
              <div className="inline">
                <strong>Amount:</strong> <span>{form.amount ? `$${form.amount}` : '-'}</span>
              </div>
              <div className="inline">
                <strong>Description:</strong> <span>{form.description || '-'}</span>
              </div>
              <div className="inline">
                <strong>Notes:</strong> <span>{form.notes || '-'}</span>
              </div>
              {/* PUBLIC_INTERFACE
                  Future hook: useExpenseMonitoring(form) to suggest budgets and detect anomalies.
              */}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
