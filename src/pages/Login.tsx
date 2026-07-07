import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { PasswordInput } from '../components/auth/PasswordInput';
import { useAuth } from '../contexts/AuthContext';

export const Login: React.FC = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const redirectTo = (location.state as { from?: string } | null)?.from || '/home';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const { error } = await signIn(email, password);

    setSubmitting(false);
    if (error) {
      setError(
        error.toLowerCase().includes('email not confirmed')
          ? 'Please verify your email before logging in. Check your inbox for the confirmation link.'
          : 'Invalid email or password.'
      );
      return;
    }

    navigate(redirectTo, { replace: true });
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to continue tracking your habits"
      footer={
        <span>
          Don't have an account?{' '}
          <Link to="/register" className="text-accent font-medium hover:text-accent">
            Sign up
          </Link>
        </span>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="you@example.com"
            required
            className="w-full px-4 py-3 text-sm border border-edge-strong rounded-xl focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors placeholder-faint"
          />
        </div>

        <PasswordInput id="password" label="Password" value={password} onChange={setPassword} />

        <div className="text-right -mt-1">
          <Link to="/forgot-password" className="text-xs text-soft hover:text-accent transition-colors">
            Forgot password?
          </Link>
        </div>

        {error && (
          <p className="text-sm text-status-missed bg-status-missed-soft rounded-xl px-4 py-2.5">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent text-white rounded-xl hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
        >
          <LogIn className="w-4 h-4" />
          {submitting ? 'Logging in…' : 'Log in'}
        </button>
      </form>
    </AuthLayout>
  );
};
