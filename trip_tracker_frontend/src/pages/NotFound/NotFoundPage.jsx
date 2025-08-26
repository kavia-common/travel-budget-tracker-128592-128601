import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * 404 page for unknown routes.
 */
export default function NotFoundPage() {
  return (
    <section className="container stack-md" style={{ paddingTop: 'var(--space-8)' }}>
      <h2>Page not found</h2>
      <p>Sorry, we couldn't find that page.</p>
      <Link to="/" className="btn">Go Home</Link>
    </section>
  );
}
