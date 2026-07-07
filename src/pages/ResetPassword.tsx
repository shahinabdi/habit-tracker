import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { KeyRound } from 'lucide-react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { PasswordInput } from '../components/auth/PasswordInput';
import { PasswordStrength } from '../components/auth/PasswordStrength';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { getPasswordStrength } from '../utils/passwordStrength';

export const ResetPassword: React.FC = () => {
  const { session, loading, updatePassword, signOut } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (getPasswordStrength(password) === 'weak') {
      setError('Please choose a stronger password (at least 8 characters).');
      return;
    }

    setSubmitting(true);
    const { error } = await updatePassword(password);
    setSubmitting(false);

    if (error) {
      setError(error);
      return;
    }

    await signOut();
    showToast('success', 'Password updated. Please log in with your new password.');
    navigate('/login', { replace: true });
  };

  if (loading) {
    return (
      <AuthLayout title="Reset your password">
        <p className="text-sm text-soft text-center">Verifying link…</p>
      </AuthLayout>
    );
  }

  if (!session) {
    return (
      <AuthLayout
        title="Link expired"
        subtitle="This password reset link is invalid or has expired"
        footer={
          <Link to="/forgot-password" className="text-accent font-medium hover:text-accent">
            Request a new link
          </Link>
        }
      >
        <p className="text-sm text-soft">Request a new password reset email and try again.</p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Choose a new password" subtitle="Make it something you haven't used before">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <PasswordInput
            id="password"
            label="New password"
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
          />
          <PasswordStrength password={password} />
        </div>

        <PasswordInput
          id="confirmPassword"
          label="Confirm new password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          autoComplete="new-password"
        />

        {error && (
          <p className="text-sm text-status-missed bg-status-missed-soft rounded-xl px-4 py-2.5">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent text-white rounded-xl hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
        >
          <KeyRound className="w-4 h-4" />
          {submitting ? 'Updating…' : 'Update password'}
        </button>
      </form>
    </AuthLayout>
  );
};
