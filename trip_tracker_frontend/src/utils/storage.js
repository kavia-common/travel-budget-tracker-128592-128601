const LS_KEY = 'trip-tracker-data-v1';

const seedTrips = [
  {
    id: 't1',
    name: 'Lisbon Escape',
    startDate: '2025-09-10',
    endDate: '2025-09-18',
    currency: 'EUR',
    budget: 1500,
    participants: ['Alice', 'Bob', 'Cara'],
    categories: ['Flights', 'Lodging', 'Food', 'Transport', 'Fun', 'Misc'],
    expenses: [
      { id: 'e1', date: '2025-09-10', category: 'Flights', description: 'Flight tickets', amount: 520, paidBy: 'Alice', splitWith: ['Alice','Bob','Cara'] },
      { id: 'e2', date: '2025-09-11', category: 'Lodging', description: 'Airbnb 2 nights', amount: 240, paidBy: 'Bob', splitWith: ['Alice','Bob','Cara'] },
      { id: 'e3', date: '2025-09-11', category: 'Food', description: 'Dinner at Time Out', amount: 78, paidBy: 'Cara', splitWith: ['Alice','Bob','Cara'] },
      { id: 'e4', date: '2025-09-12', category: 'Transport', description: 'Metro passes', amount: 18, paidBy: 'Alice', splitWith: ['Alice','Bob','Cara'] },
      { id: 'e5', date: '2025-09-12', category: 'Fun', description: 'Oceanarium tickets', amount: 48, paidBy: 'Bob', splitWith: ['Alice','Bob','Cara'] }
    ]
  },
  {
    id: 't2',
    name: 'Kyoto Culture Trip',
    startDate: '2025-11-02',
    endDate: '2025-11-09',
    currency: 'JPY',
    budget: 220000,
    participants: ['You'],
    categories: ['Flights','Lodging','Food','Transport','Attractions','Gifts'],
    expenses: [
      { id: 'e6', date: '2025-11-02', category: 'Transport', description: 'ICOCA card', amount: 5000, paidBy: 'You', splitWith: ['You'] },
      { id: 'e7', date: '2025-11-03', category: 'Food', description: 'Ramen', amount: 1200, paidBy: 'You', splitWith: ['You'] }
    ]
  }
];

export function loadData() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) {
      localStorage.setItem(LS_KEY, JSON.stringify({ trips: seedTrips }));
      return { trips: seedTrips };
    }
    return JSON.parse(raw);
  } catch {
    return { trips: seedTrips };
  }
}

export function saveData(data) {
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

export function uid(prefix='id') {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}
