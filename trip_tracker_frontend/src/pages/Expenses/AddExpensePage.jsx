import React, { useState } from 'react';
import Card from '../../components/common/Card';

/**
 * PUBLIC_INTERFACE
 * Quick add expense form using Card and design tokens.
 */
export default function AddExpensePage() {
  const [form, setForm] = useState({ description: '', amount: '', category: 'Food' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Expense added: ${form.description} - $${form.amount} (${form.category})`);
    setForm({ description: '', amount: '', category: 'Food' });
  };

  return (
    <section className="container stack-lg">
      <header>
        <h2>Add Expense</h2>
      </header>
      <Card variant="peach" gradient title="Quick Add" subtitle="Record a new expense">
        <form onSubmit={handleSubmit} className="stack-sm" style={{ maxWidth: 420 }}>
          <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
          <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} required />
          <select name="category" value={form.category} onChange={handleChange}>
            <option>Food</option>
            <option>Transport</option>
            <option>Stay</option>
            <option>Activities</option>
            <option>Other</option>
          </select>
          <button className="btn" type="submit">Add</button>
        </form>
      </Card>
    </section>
  );
}
