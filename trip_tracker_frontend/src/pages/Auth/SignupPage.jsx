import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../services/auth/AuthContext';

/**
 * PUBLIC_INTERFACE
 * Minimal signup form using placeholder AuthContext.
 */
export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('new@trip.com');
  const [password, setPassword] = useState('demo');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await signup(email, password);
    setLoading(false);
    navigate('/', { replace: true });
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Sign up</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, maxWidth: 360 }}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
        <button className="btn" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
      </form>
      <p style={{ marginTop: 8 }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
