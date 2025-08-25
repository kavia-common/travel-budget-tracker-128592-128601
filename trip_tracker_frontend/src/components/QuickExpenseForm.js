import React, { useMemo, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * QuickExpenseForm for adding/editing an expense.
 */
export default function QuickExpenseForm({ trip, onSubmit, initial }) {
  const [date, setDate] = useState(initial?.date || '');
  const [category, setCategory] = useState(initial?.category || (trip.categories[0] || 'Misc'));
  const [description, setDescription] = useState(initial?.description || '');
  const [amount, setAmount] = useState(initial?.amount || '');
  const [paidBy, setPaidBy] = useState(initial?.paidBy || (trip.participants[0] || 'You'));
  const [splitWith, setSplitWith] = useState(initial?.splitWith || trip.participants);

  const invalid = useMemo(() => !date || !category || !amount || isNaN(Number(amount)), [date, category, amount]);

  const toggleSplit = (p) => {
    setSplitWith((prev) => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (invalid) return;
    onSubmit({ date, category, description, amount: Number(amount), paidBy, splitWith });
  };

  return (
    <form onSubmit={handleSubmit} style={{display:'grid', gap:8}}>
      <div style={{display:'grid', gap:6}}>
        <label>Date</label>
        <input className="input" type="date" value={date} onChange={e=>setDate(e.target.value)} />
      </div>
      <div style={{display:'grid', gap:6}}>
        <label>Category</label>
        <select className="select" value={category} onChange={e=>setCategory(e.target.value)}>
          {trip.categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div style={{display:'grid', gap:6}}>
        <label>Description</label>
        <input className="input" value={description} onChange={e=>setDescription(e.target.value)} placeholder="What was this?" />
      </div>
      <div style={{display:'grid', gap:6}}>
        <label>Amount</label>
        <input className="input" value={amount} onChange={e=>setAmount(e.target.value)} inputMode="decimal" placeholder="0.00" />
      </div>
      <div style={{display:'grid', gap:6}}>
        <label>Paid by</label>
        <select className="select" value={paidBy} onChange={e=>setPaidBy(e.target.value)}>
          {trip.participants.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <div style={{display:'grid', gap:6}}>
        <label>Split with</label>
        <div className="toolbar">
          {trip.participants.map(p => (
            <button type="button" key={p} onClick={()=>toggleSplit(p)} className={`btn ghost ${splitWith.includes(p) ? '' : 'secondary'}`}>
              {splitWith.includes(p) ? '✓ ' : ''}{p}
            </button>
          ))}
        </div>
      </div>
      <div style={{display:'flex', justifyContent:'flex-end', gap:8, marginTop:4}}>
        <button type="submit" className="btn">Save</button>
      </div>
    </form>
  );
}
