import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { listTrips, createTrip, updateTrip, deleteTrip } from '../services/api';
import { totalSpent } from '../utils/calc';

// PUBLIC_INTERFACE
export default function TripsPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const trips = useMemo(() => listTrips(), [refreshKey]);

  const [form, setForm] = useState({ name:'', startDate:'', endDate:'', currency:'USD', budget:0, participants:'You', categories:'Flights,Lodging,Food,Transport,Fun,Misc' });
  const [editingId, setEditingId] = useState(null);

  const submitCreate = (e) => {
    e.preventDefault();
    const participants = form.participants.split(',').map(s=>s.trim()).filter(Boolean);
    const categories = form.categories.split(',').map(s=>s.trim()).filter(Boolean);
    createTrip({ ...form, budget: Number(form.budget || 0), participants, categories });
    setForm({ name:'', startDate:'', endDate:'', currency:'USD', budget:0, participants:'You', categories:'Flights,Lodging,Food,Transport,Fun,Misc' });
    setRefreshKey(v=>v+1);
  };

  const startEdit = (t) => {
    setEditingId(t.id);
    setForm({
      name: t.name, startDate: t.startDate, endDate: t.endDate, currency: t.currency, budget: t.budget,
      participants: t.participants.join(', '), categories: t.categories.join(', ')
    });
  };

  const submitUpdate = (e) => {
    e.preventDefault();
    const participants = form.participants.split(',').map(s=>s.trim()).filter(Boolean);
    const categories = form.categories.split(',').map(s=>s.trim()).filter(Boolean);
    updateTrip(editingId, { ...form, budget: Number(form.budget || 0), participants, categories });
    setEditingId(null);
    setRefreshKey(v=>v+1);
  };

  const removeTrip = (id) => {
    if (!window.confirm('Delete this trip?')) return;
    deleteTrip(id);
    setRefreshKey(v=>v+1);
  };

  return (
    <div className="container">
      <div className="grid grid-2">
        <Card title={editingId ? 'Edit trip' : 'Create a new trip'} subtitle="Define dates, budget, currency, participants and categories." gradient>
          <form onSubmit={editingId ? submitUpdate : submitCreate} style={{display:'grid', gap:8}}>
            <input className="input" placeholder="Trip name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
              <input className="input" type="date" value={form.startDate} onChange={e=>setForm({...form, startDate:e.target.value})} />
              <input className="input" type="date" value={form.endDate} onChange={e=>setForm({...form, endDate:e.target.value})} />
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
              <input className="input" placeholder="Currency (e.g. USD, EUR)" value={form.currency} onChange={e=>setForm({...form, currency:e.target.value})} />
              <input className="input" placeholder="Budget" value={form.budget} onChange={e=>setForm({...form, budget:e.target.value})} />
            </div>
            <input className="input" placeholder="Participants (comma separated)" value={form.participants} onChange={e=>setForm({...form, participants:e.target.value})} />
            <input className="input" placeholder="Categories (comma separated)" value={form.categories} onChange={e=>setForm({...form, categories:e.target.value})} />
            <div style={{display:'flex', gap:8}}>
              <button className="btn" type="submit">{editingId ? 'Save changes' : 'Create trip'}</button>
              {editingId && <button type="button" className="btn secondary" onClick={()=>{ setEditingId(null); setForm({ name:'', startDate:'', endDate:'', currency:'USD', budget:0, participants:'You', categories:'Flights,Lodging,Food,Transport,Fun,Misc' }); }}>Cancel</button>}
            </div>
          </form>
        </Card>

        <Card title="Your trips" subtitle="Select a trip to manage expenses.">
          <div style={{display:'grid', gap:8}}>
            {trips.map(t => (
              <div key={t.id} className="card" style={{padding:12}}>
                <div style={{display:'flex', gap:8, alignItems:'center'}}>
                  <div style={{fontWeight:800}}><Link to={`/trips/${t.id}`}>{t.name}</Link></div>
                  <div style={{fontSize:12, color:'var(--muted)'}}>{t.startDate} → {t.endDate}</div>
                  <div style={{marginLeft:'auto', fontWeight:800}}>{t.currency} {totalSpent(t.expenses).toLocaleString()} / {t.currency} {t.budget.toLocaleString()}</div>
                </div>
                <div style={{display:'flex', gap:8, justifyContent:'flex-end', marginTop:6}}>
                  <button className="btn ghost" onClick={()=>startEdit(t)}>Edit</button>
                  <button className="btn secondary" onClick={()=>removeTrip(t.id)}>Delete</button>
                  <Link className="btn" to={`/trips/${t.id}`}>Open</Link>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
