import React from 'react';
import Card from '../components/Card';

// PUBLIC_INTERFACE
export default function FlowPage() {
  return (
    <div className="container">
      <Card title="App navigation flow" subtitle="Visual summary">
        <pre style={{whiteSpace:'pre-wrap', lineHeight:1.7}}>
{`Login -> Dashboard -> Trips -> Trip Detail -> Group -> Summary

- Login:
  • Google Sign-In (or Demo Mode)
- Dashboard:
  • Hero card with budget, progress, quick add expense
  • Charts: Pie + Bar
- Trips:
  • Create/Edit trips, list, open details
- Trip Detail:
  • Expenses list + quick add/edit
  • Category breakdown + budget alerts
- Group:
  • Balances and suggested settlements
- Summary:
  • Totals, per-category, balances, Export CSV/PDF`}
        </pre>
      </Card>
    </div>
  );
}
