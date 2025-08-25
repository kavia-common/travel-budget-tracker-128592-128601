import React, { useMemo } from 'react';
import Card from '../components/Card';
import { listTrips } from '../services/api';
import { computeBalances, settleSuggestions } from '../utils/calc';

// PUBLIC_INTERFACE
export default function GroupPage() {
  const trips = listTrips();
  const trip = trips[0];

  // Always call hooks. Use safe fallbacks when no trip exists.
  const participants = trip?.participants || [];
  const currency = trip?.currency || 'USD';
  const expenses = trip?.expenses || [];

  const balances = useMemo(() => computeBalances(expenses, participants), [expenses, participants]);
  const tx = useMemo(() => settleSuggestions(balances), [balances]);

  if (!trip) {
    return (
      <div className="container">
        <Card title="No trips available">Create a group trip to see balances.</Card>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="grid grid-2">
        <Card title="Group balances" subtitle="Positive = others owe them; Negative = they owe">
          <div style={{display:'grid', gap:8}}>
            {participants.map(p => (
              <div key={p} className="card" style={{padding:12}}>
                <div style={{display:'flex'}}>
                  <div style={{fontWeight:800}}>{p}</div>
                  <div style={{marginLeft:'auto', fontWeight:800, color: (balances[p] || 0) >= 0 ? '#0c5' : '#c30'}}>
                    {currency} {Math.round((balances[p] || 0) * 100)/100}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Suggested settlements" subtitle="Greedy algorithm">
          {!tx.length ? <div style={{color:'var(--muted)'}}>Everyone is settled 🎉</div> : (
            <div style={{display:'grid', gap:8}}>
              {tx.map((t, i) => (
                <div key={i} className="card" style={{padding:12}}>
                  <strong>{t.from}</strong> pays <strong>{currency} {t.amount}</strong> to <strong>{t.to}</strong>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
