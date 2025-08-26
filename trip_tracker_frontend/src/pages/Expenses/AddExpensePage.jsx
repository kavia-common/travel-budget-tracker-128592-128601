import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * Quick add expense form (placeholder).
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
    <section>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, maxWidth: 360 }}>
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
    </section>
  );
}
