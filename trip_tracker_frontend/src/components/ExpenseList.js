import React from 'react';

/**
 * PUBLIC_INTERFACE
 * ExpenseList displays expenses with edit/delete callbacks.
 */
export default function ExpenseList({ expenses, currency, onEdit, onDelete }) {
  if (!expenses?.length) return <div style={{color:'var(--muted)'}}>No expenses yet.</div>;
  return (
    <div style={{display:'grid', gap:8}}>
      {expenses.map(e => (
        <div key={e.id} className="card" style={{padding:'12px'}}>
          <div style={{display:'grid', gap:4}}>
            <div style={{display:'flex', alignItems:'center', gap:8}}>
              <div style={{fontWeight:700}}>{e.description || e.category}</div>
              <div style={{marginLeft:'auto', fontWeight:800}}>{currency} {Number(e.amount).toFixed(2)}</div>
            </div>
            <div style={{fontSize:12, color:'var(--muted)'}}>
              {e.date} • {e.category} • Paid by {e.paidBy} • Split with {e.splitWith?.join(', ')}
            </div>
            <div style={{display:'flex', gap:8, justifyContent:'flex-end'}}>
              <button className="btn ghost" onClick={()=>onEdit?.(e)}>Edit</button>
              <button className="btn secondary" onClick={()=>onDelete?.(e)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
