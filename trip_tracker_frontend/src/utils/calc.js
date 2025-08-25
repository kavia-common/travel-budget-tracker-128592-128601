/**
 * Sum of expenses amounts.
 */
export function totalSpent(expenses) {
  return expenses.reduce((s, e) => s + Number(e.amount || 0), 0);
}

/**
 * Group by category.
 */
export function byCategory(expenses) {
  const map = {};
  for (const e of expenses) {
    map[e.category] = (map[e.category] || 0) + Number(e.amount || 0);
  }
  return map;
}

/**
 * Compute per-person net balances for group splitting.
 * Positive => others owe them, Negative => they owe.
 */
export function computeBalances(expenses, participants) {
  const balances = Object.fromEntries(participants.map(p => [p, 0]));
  for (const e of expenses) {
    const split = e.splitWith && e.splitWith.length ? e.splitWith : [e.paidBy];
    const share = Number(e.amount || 0) / split.length;
    // paidBy increases credit by full amount
    balances[e.paidBy] += Number(e.amount || 0);
    // each in split owes share
    for (const p of split) {
      balances[p] -= share;
    }
  }
  return balances;
}

/**
 * Convert balances object to simple settlement suggestions (greedy).
 */
export function settleSuggestions(balances) {
  const debtors = [];
  const creditors = [];
  for (const [p, v] of Object.entries(balances)) {
    if (v < -0.01) debtors.push({ p, v });
    else if (v > 0.01) creditors.push({ p, v });
  }
  debtors.sort((a,b) => a.v - b.v);
  creditors.sort((a,b) => b.v - a.v);
  const tx = [];
  let i=0, j=0;
  while (i < debtors.length && j < creditors.length) {
    const amount = Math.min(-debtors[i].v, creditors[j].v);
    tx.push({ from: debtors[i].p, to: creditors[j].p, amount: Math.round(amount * 100) / 100 });
    debtors[i].v += amount;
    creditors[j].v -= amount;
    if (Math.abs(debtors[i].v) < 0.01) i++;
    if (Math.abs(creditors[j].v) < 0.01) j++;
  }
  return tx;
}
