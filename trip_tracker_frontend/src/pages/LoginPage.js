import React from 'react';
import Card from '../components/Card';
import { useAuth } from '../auth/AuthContext';

// PUBLIC_INTERFACE
export default function LoginPage() {
  const { signInWithGoogle, demoMode, toggleDemoMode } = useAuth();
  return (
    <div className="container" style={{display:'grid', placeItems:'center', minHeight:'80vh'}}>
      <Card title="Welcome to Trip Tracker" subtitle="Plan budgets, track spending, split expenses." className="gradient" toolbar={
        <button className="btn secondary" onClick={toggleDemoMode}>{demoMode ? 'Demo: ON' : 'Demo: OFF'}</button>
      }>
        <div style={{display:'grid', gap:12}}>
          <div style={{color:'var(--muted)'}}>Sign in to sync your trips, or continue testing with Demo Mode.</div>
          <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
            <button className="btn" onClick={signInWithGoogle}>Sign in with Google</button>
          </div>
        </div>
      </Card>
    </div>
  );
}
