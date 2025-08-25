/**
 * PUBLIC_INTERFACE
 * API service abstraction. Currently uses localStorage for demo.
 * If REACT_APP_API_BASE_URL is set, integrate real REST calls here.
 */
import { loadData, saveData, uid } from '../utils/storage';

export function listTrips() {
  return loadData().trips;
}

export function getTrip(id) {
  return loadData().trips.find(t => t.id === id);
}

export function createTrip(partial) {
  const data = loadData();
  const trip = {
    id: uid('t'),
    name: partial.name || 'New Trip',
    startDate: partial.startDate || '',
    endDate: partial.endDate || '',
    currency: partial.currency || 'USD',
    budget: Number(partial.budget || 0),
    participants: partial.participants?.length ? partial.participants : ['You'],
    categories: partial.categories?.length ? partial.categories : ['Flights','Lodging','Food','Transport','Fun','Misc'],
    expenses: []
  };
  data.trips.unshift(trip);
  saveData(data);
  return trip;
}

export function updateTrip(id, updates) {
  const data = loadData();
  const idx = data.trips.findIndex(t => t.id === id);
  if (idx >= 0) {
    data.trips[idx] = { ...data.trips[idx], ...updates };
    saveData(data);
    return data.trips[idx];
  }
  return null;
}

export function deleteTrip(id) {
  const data = loadData();
  data.trips = data.trips.filter(t => t.id !== id);
  saveData(data);
}

export function addExpense(tripId, expense) {
  const data = loadData();
  const trip = data.trips.find(t => t.id === tripId);
  if (!trip) return null;
  const e = { id: uid('e'), ...expense, amount: Number(expense.amount || 0) };
  trip.expenses.unshift(e);
  saveData(data);
  return e;
}

export function updateExpense(tripId, expenseId, updates) {
  const data = loadData();
  const trip = data.trips.find(t => t.id === tripId);
  if (!trip) return null;
  const idx = trip.expenses.findIndex(e => e.id === expenseId);
  if (idx >= 0) {
    trip.expenses[idx] = { ...trip.expenses[idx], ...updates, amount: Number(updates.amount ?? trip.expenses[idx].amount) };
    saveData(data);
    return trip.expenses[idx];
  }
  return null;
}

export function deleteExpense(tripId, expenseId) {
  const data = loadData();
  const trip = data.trips.find(t => t.id === tripId);
  if (!trip) return;
  trip.expenses = trip.expenses.filter(e => e.id !== expenseId);
  saveData(data);
}
