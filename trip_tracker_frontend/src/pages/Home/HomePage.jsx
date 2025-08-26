import React from 'react';
import TripSetup from '../../components/trips/TripSetup';
import DashboardPage from '../Dashboard/DashboardPage';

/**
 * PUBLIC_INTERFACE
 * HomePage composes the Trip Setup section above the Dashboard for a seamless entry flow.
 * It replaces the standalone Trip Setup page as the top-level experience.
 */
export default function HomePage() {
  return (
    <section className="container stack-lg">
      {/* Trip Setup on top */}
      <div className="grid-cards">
        <div className="col-12">
          <TripSetup />
        </div>
      </div>

      {/* Dashboard content below */}
      <DashboardPage />
    </section>
  );
}
