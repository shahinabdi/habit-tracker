import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const CenteredSpinner: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-canvas">
    <div className="w-8 h-8 border-2 border-edge-strong border-t-accent rounded-full animate-spin" />
  </div>
);

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) return <CenteredSpinner />;
  if (!session) return <Navigate to="/login" state={{ from: location.pathname }} replace />;

  return <>{children}</>;
};

export const PublicOnlyRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session, loading } = useAuth();

  if (loading) return <CenteredSpinner />;
  if (session) return <Navigate to="/home" replace />;

  return <>{children}</>;
};
