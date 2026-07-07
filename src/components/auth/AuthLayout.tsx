import React from 'react';

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subtitle, children, footer }) => {
  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-ink tracking-tight">Habit Tracker</h1>
        </div>

        <div className="bg-surface rounded-2xl border border-edge p-6 sm:p-8 animate-view-enter">
          <h2 className="text-lg font-semibold text-ink mb-1">{title}</h2>
          {subtitle && <p className="text-sm text-soft mb-6">{subtitle}</p>}
          {!subtitle && <div className="mb-6" />}
          {children}
        </div>

        {footer && <div className="text-center mt-5 text-sm text-soft">{footer}</div>}
      </div>
    </div>
  );
};
