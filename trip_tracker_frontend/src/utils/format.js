 /**
  * PUBLIC_INTERFACE
  * Format currency values.
  */
export function formatCurrency(amount, currency = 'USD') {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount ?? 0);
  } catch {
    return `$${Number(amount ?? 0).toFixed(2)}`;
  }
}
