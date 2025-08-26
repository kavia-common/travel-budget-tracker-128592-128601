import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Lists user trips (placeholder).
 */
export default function TripsListPage() {
  const demoTrips = [
    { id: '1', name: 'Paris Getaway', budget: 1200, spent: 450 },
    { id: '2', name: 'Tokyo Adventure', budget: 2200, spent: 0 },
  ];

  return (
    <section>
      <h2>Your Trips</h2>
      <ul>
        {demoTrips.map((t) => (
          <li key={t.id}>
            <a href={`/trips/${t.id}`}>{t.name}</a> — Budget: ${t.budget}, Spent: ${t.spent}
          </li>
        ))}
      </ul>
    </section>
  );
}
