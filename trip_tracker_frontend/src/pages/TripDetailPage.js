import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../components/Card';
import Modal from '../components/Modal';
import QuickExpenseForm from '../components/QuickExpenseForm';
import ExpenseList from '../components/ExpenseList';
import { getTrip, addExpense, updateExpense, deleteExpense } from '../services/api';
import { totalSpent, byCategory } from '../utils/calc';
import { CategoryPie } from '../components/Charts';

// PUBLIC_INTERFACE
export default function TripDetailPage() {
  const { id } = useParams();
  const [refreshKey, setRefreshKey] = useState(0);
  const trip = useMemo(()=> getTrip(id), [id, refreshKey]);

  const [open, setOpen] = useState(false);
  const [editExp, setEditExp] = useState(null);

  if (!trip) return (
    <div className="container">
      <Card title="Trip not found">
        <Link className="btn" to="/trips">Back to trips</Link>
      </Card>
    </div>
  );

  const spent = totalSpent(trip.expenses);
  const cat = byCategory(trip.expenses);
  const remain = Math.max(0, trip.budget - spent);
  const overBudget = spent > trip.budget;

  const onCreate = (payload) => {
    addExpense(trip.id, payload);
    setOpen(false);
    setRefreshKey(v=>v+1);
  };
  const onEdit = (payload) => {
    updateExpense(trip.id, editExp.id, payload);
    setEditExp(null);
    setRefreshKey(v=>v+1);
  };
  const onDelete = (e) => {
    if (!window.confirm('Delete expense?')) return;
    deleteExpense(trip.id, e.id);
    setRefreshKey(v=>v+1);
  };

  return (
    <div className="container">
      <div className="grid">
        <Card gradient title={trip.name} subtitle={`${trip.startDate} → ${trip.endDate} · ${trip.currency}`} toolbar={
          <div className="toolbar">
            <button className="btn accent" onClick={()=>setOpen(true)}>+ Quick expense</button>
            <Link to="/trips" className="btn ghost">All trips</Link>
          </div>
        }>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12}}>
            <div className="kpi"><div className="label">Budget</div><div className="value">{trip.currency} {trip.budget.toLocaleString()}</div></div>
            <div className="kpi"><div className="label">Spent</div><div className="value">{trip.currency} {spent.toLocaleString()}</div></div>
            <div className="kpi"><div className="label">Remaining</div><div className="value">{trip.currency} {remain.toLocaleString()}</div></div>
          </div>
          {overBudget && <div style={{marginTop:8, color:'#5c4a00', background:'rgba(255,212,107,0.35)', border:'1px solid rgba(255,212,107,0.7)', padding:8, borderRadius:10}}>Over budget! Consider cutting costs on categories with the highest spending.</div>}
        </Card>

        <div className="grid grid-2">
          <Card title="Expenses" toolbar={<button className="btn" onClick={()=>setOpen(true)}>Add</button>}>
            <ExpenseList expenses={trip.expenses} currency={trip.currency} onEdit={setEditExp} onDelete={onDelete} />
          </Card>
          <Card title="Category breakdown">
            <CategoryPie data={cat} />
          </Card>
        </div>
      </div>

      <Modal open={open} onClose={()=>setOpen(false)} title="Add expense" footer={<button className="btn secondary" onClick={()=>setOpen(false)}>Close</button>}>
        <QuickExpenseForm trip={trip} onSubmit={onCreate} />
      </Modal>
      <Modal open={!!editExp} onClose={()=>setEditExp(null)} title="Edit expense" footer={<button className="btn secondary" onClick={()=>setEditExp(null)}>Close</button>}>
        {editExp && <QuickExpenseForm trip={trip} onSubmit={onEdit} initial={editExp} />}
      </Modal>
    </div>
  );
}
