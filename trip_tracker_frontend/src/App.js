import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import './index.css';
import { AuthProvider, useAuth } from './auth/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TripsPage from './pages/TripsPage';
import TripDetailPage from './pages/TripDetailPage';
import GroupPage from './pages/GroupPage';
import SummaryPage from './pages/SummaryPage';
import FlowPage from './pages/FlowPage';

function NavBar() {
  const { user, signOutUser, demoMode, toggleDemoMode } = useAuth();
  return (
    <div className="navbar">
      <div className="nav-inner">
        <div className="brand">✈️ Trip Tracker</div>
        <Link to="/dashboard" className="btn ghost">Dashboard</Link>
        <Link to="/trips" className="btn ghost">Trips</Link>
        <Link to="/group" className="btn ghost">Group</Link>
        <Link to="/summary" className="btn ghost">Summary</Link>
        <Link to="/flow" className="btn ghost">Flow</Link>
        <div className="spacer" />
        <button className="btn secondary" onClick={toggleDemoMode} title="Toggle demo mode">
          {demoMode ? 'Demo: ON' : 'Demo: OFF'}
        </button>
        {user ? (
          <button className="btn" onClick={signOutUser}>Sign out</button>
        ) : (
          <Link className="btn" to="/login">Sign in</Link>
        )}
      </div>
    </div>
  );
}

function MobileNav() {
  return (
    <div className="mobile-nav">
      <Link to="/dashboard" className="nav-card">Dashboard</Link>
      <Link to="/trips" className="nav-card">Trips</Link>
      <Link to="/group" className="nav-card">Group</Link>
      <Link to="/summary" className="nav-card">Summary</Link>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { user, demoMode } = useAuth();
  if (demoMode) return children;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

// PUBLIC_INTERFACE
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/trips" element={
            <ProtectedRoute>
              <TripsPage />
            </ProtectedRoute>
          } />
          <Route path="/trips/:id" element={
            <ProtectedRoute>
              <TripDetailPage />
            </ProtectedRoute>
          } />
          <Route path="/group" element={
            <ProtectedRoute>
              <GroupPage />
            </ProtectedRoute>
          } />
          <Route path="/summary" element={
            <ProtectedRoute>
              <SummaryPage />
            </ProtectedRoute>
          } />
          <Route path="/flow" element={<FlowPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        <div className="footer-space" />
        <MobileNav />
      </BrowserRouter>
    </AuthProvider>
  );
}
