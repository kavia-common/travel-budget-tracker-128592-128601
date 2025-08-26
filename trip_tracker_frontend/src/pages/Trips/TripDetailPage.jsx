import React from 'react';
import { useParams } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Displays trip detail (placeholder).
 */
export default function TripDetailPage() {
  const { tripId } = useParams();
  return (
    <section>
      <h2>Trip Details</h2>
      <p>Trip ID: {tripId}</p>
      <p>Here we will show budget progress, categories, and expenses.</p>
    </section>
  );
}
