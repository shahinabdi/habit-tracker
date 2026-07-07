import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { useAuth } from '../contexts/AuthContext';

export const ForgotPassword: React.FC = () => {
  const { sendPasswordReset } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const { error } = await sendPasswordReset(email);

    setSubmitting(false);
    if (error) {
      setError('Something went wrong. Please try again.');
      return;
    }
    setSent(true);
  };

  return (
    <AuthLayout
      title="Reset your password"
      subtitle={sent ? undefined : "We'll email you a link to reset your password"}
      footer={
        <Link to="/login" className="inline-flex items-center gap-1.5 text-soft hover:text-accent transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to login
        </Link>
      }
    >
      {sent ? (
        <div className="text-center py-2">
          <div className="w-12 h-12 bg-accent-soft rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-5 h-5 text-accent" />
          </div>
          <p className="text-sm text-soft">
            If an account exists for <span className="font-medium text-ink">{email}</span>, a reset link is on its way.
          </p>
        </div>
      ) : (
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

          {error && (
            <p className="text-sm text-status-missed bg-status-missed-soft rounded-xl px-4 py-2.5">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent text-white rounded-xl hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
          >
            <Mail className="w-4 h-4" />
            {submitting ? 'Sending…' : 'Send reset link'}
          </button>
        </form>
      )}
    </AuthLayout>
  );
};
