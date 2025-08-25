import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Alerts related to budget status and savings tips.
 */
export default function Alerts({ overBudget, savingTip }) {
  return (
    <div style={{display:'grid', gap:8}}>
      {overBudget && (
        <div className="card" style={{background:'linear-gradient(90deg, rgba(255,212,107,0.4), transparent)', border:'1px solid rgba(255,212,107,0.7)'}}>
          <div style={{fontWeight:800}}>Heads up! Over budget</div>
          <div style={{fontSize:13}}>You have exceeded the planned budget. Consider adjusting categories or looking for savings.</div>
        </div>
      )}
      {savingTip && (
        <div className="card" style={{background:'linear-gradient(90deg, rgba(108,198,203,0.25), transparent)', border:'1px solid rgba(108,198,203,0.6)'}}>
          <div style={{fontWeight:800}}>Savings tip</div>
          <div style={{fontSize:13}}>{savingTip}</div>
        </div>
      )}
    </div>
  );
}
