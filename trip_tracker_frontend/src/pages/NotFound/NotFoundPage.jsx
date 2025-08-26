import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * 404 page for unknown routes.
 */
export default function NotFoundPage() {
  return (
    <div style={{ padding: 24 }}>
      <h2>Page not found</h2>
      <p>Sorry, we couldn't find that page.</p>
      <Link to="/" className="btn">Go Home</Link>
    </div>
  );
}
