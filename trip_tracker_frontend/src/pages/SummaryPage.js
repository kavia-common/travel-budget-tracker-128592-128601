import React, { useMemo } from 'react';
import Card from '../components/Card';
import { listTrips } from '../services/api';
import { byCategory, computeBalances, totalSpent } from '../utils/calc';
import { CategoryPie, SpendingBar } from '../components/Charts';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

// PUBLIC_INTERFACE
export default function SummaryPage() {
  const trips = listTrips();
  const trip = trips[0];
  const currency = trip?.currency || 'USD';

  const spent = useMemo(()=> totalSpent(trip?.expenses || []), [trip]);
  const cat = useMemo(()=> byCategory(trip?.expenses || []), [trip]);
  const balances = useMemo(()=> trip ? computeBalances(trip.expenses, trip.participants) : {}, [trip]);

  const exportCSV = () => {
    if (!trip) return;
    const rows = trip.expenses.map(e => ({
      date: e.date, category: e.category, description: e.description, amount: e.amount, paidBy: e.paidBy, splitWith: e.splitWith.join('|')
    }));
    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${trip.name.replace(/\s+/g,'_')}_expenses.csv`);
  };

  const exportPDF = () => {
    // Simple approach: open print dialog for the summary area
    window.print();
  };

  if (!trip) return (
    <div className="container">
      <Card title="No trip selected" subtitle="Create or open a trip to see summaries." />
    </div>
  );

  return (
    <div className="container">
      <div className="grid">
        <Card gradient title={`${trip.name} · Summary`} subtitle={`${trip.startDate} → ${trip.endDate}`}>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12}}>
            <div className="kpi"><div className="label">Budget</div><div className="value">{currency} {trip.budget.toLocaleString()}</div></div>
            <div className="kpi"><div className="label">Total spent</div><div className="value">{currency} {spent.toLocaleString()}</div></div>
            <div className="kpi"><div className="label">Remaining</div><div className="value">{currency} {(trip.budget - spent).toLocaleString()}</div></div>
          </div>
          <div className="toolbar" style={{marginTop:8}}>
            <button className="btn" onClick={exportCSV}>Export CSV</button>
            <button className="btn accent" onClick={exportPDF}>Export PDF</button>
          </div>
        </Card>

        <div className="grid grid-2">
          <Card title="Spending breakdown (pie)">
            <CategoryPie data={cat} />
          </Card>
          <Card title="Spending per category (bar)">
            <SpendingBar data={cat} />
          </Card>
        </div>

        <Card title="Balances">
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:8}}>
            {Object.entries(balances).map(([p, v]) => (
              <div key={p} className="card" style={{padding:12}}>
                <div style={{fontWeight:800}}>{p}</div>
                <div style={{fontWeight:800, color: v >= 0 ? '#0c5' : '#c30'}}>{currency} {Math.round(v*100)/100}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
