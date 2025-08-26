import React from 'react';
import TripSetup from '../../components/trips/TripSetup';

/**
 * PUBLIC_INTERFACE
 * TripSetupPage hosts the Trip Setup UI as a standalone page.
 * Route: /trip-setup
 * Renders the TripSetup form/card and a minimal page header.
 */
export default function TripSetupPage() {
  return (
    <section className="container stack-lg">
      <header className="stack-xs">
        <h2>Trip Setup</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Plan your next adventure: set dates, budget, and invite friends.
        </p>
      </header>

      <div className="grid-cards">
        <div className="col-12">
          <TripSetup />
        </div>
      </div>
    </section>
  );
}
