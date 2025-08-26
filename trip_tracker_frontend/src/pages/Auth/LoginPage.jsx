import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../services/auth/AuthContext';

/**
 * PUBLIC_INTERFACE
 * Minimal login form using placeholder AuthContext.
 */
export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('demo@trip.com');
  const [password, setPassword] = useState('demo');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password);
    setLoading(false);
    navigate(from, { replace: true });
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Login</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, maxWidth: 360 }}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
        <button className="btn" type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
      <p style={{ marginTop: 8 }}>
        No account? <Link to="/signup">Create one</Link>
      </p>
    </div>
  );
}
