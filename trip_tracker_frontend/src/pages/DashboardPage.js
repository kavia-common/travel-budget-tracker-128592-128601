import React, { useMemo, useState } from 'react';
import Card from '../components/Card';
import Modal from '../components/Modal';
import QuickExpenseForm from '../components/QuickExpenseForm';
import { listTrips, addExpense } from '../services/api';
import { totalSpent, byCategory } from '../utils/calc';
import { CategoryPie, SpendingBar } from '../components/Charts';

// PUBLIC_INTERFACE
export default function DashboardPage() {
  const trips = listTrips();
  const currentTrip = trips[0]; // most recent
  const [open, setOpen] = useState(false);

  const spent = useMemo(() => totalSpent(currentTrip?.expenses || []), [currentTrip]);
  const cat = useMemo(() => byCategory(currentTrip?.expenses || []), [currentTrip]);
  const remain = Math.max(0, (currentTrip?.budget || 0) - spent);
  const progress = currentTrip?.budget ? Math.min(100, Math.round(spent / currentTrip.budget * 100)) : 0;

  const handleQuickAdd = (payload) => {
    addExpense(currentTrip.id, payload);
    setOpen(false);
  };

  if (!currentTrip) return (
    <div className="container">
      <Card title="No trips yet">
        Create your first trip from the Trips page.
      </Card>
    </div>
  );

  return (
    <div className="container">
      <div className="grid">
        <Card gradient title={currentTrip.name} subtitle={`${currentTrip.startDate} → ${currentTrip.endDate} · ${currentTrip.currency}`} toolbar={
          <div className="toolbar">
            <button className="btn accent" onClick={()=>setOpen(true)}>+ Quick expense</button>
          </div>
        }>
          <div style={{display:'grid', gap:12}}>
            <div style={{display:'grid', gap:12}}>
              <div className="kpi">
                <div className="label">Budget</div>
                <div className="value">{currentTrip.currency} {currentTrip.budget.toLocaleString()}</div>
              </div>
              <div className="kpi">
                <div className="label">Spent</div>
                <div className="value">{currentTrip.currency} {spent.toLocaleString()}</div>
              </div>
              <div className="kpi">
                <div className="label">Remaining</div>
                <div className="value">{currentTrip.currency} {remain.toLocaleString()}</div>
              </div>
              <div style={{height:10, background:'#f0f3f5', borderRadius:10, overflow:'hidden', border:'1px solid var(--ring)'}}>
                <div style={{width:`${progress}%`, background:'linear-gradient(90deg, #6CC6CB, #F6C7B6)', height:'100%'}} />
              </div>
              <div style={{fontSize:12, color:'var(--muted)'}}>Progress: {progress}% of budget used</div>
            </div>
          </div>
        </Card>

        <div className="grid grid-2">
          <Card title="Category breakdown">
            <CategoryPie data={cat} />
          </Card>
          <Card title="Spending by category">
            <SpendingBar data={cat} />
          </Card>
        </div>
      </div>

      <Modal open={open} onClose={()=>setOpen(false)} title="Quick add expense"
        footer={<button className="btn secondary" onClick={()=>setOpen(false)}>Close</button>}
      >
        <QuickExpenseForm trip={currentTrip} onSubmit={handleQuickAdd} />
      </Modal>
    </div>
  );
}
