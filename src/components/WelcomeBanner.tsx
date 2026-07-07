import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getDailyPhrase, getGreeting } from '../utils/motivation';
import { getDisplayName } from '../utils/user';

export const WelcomeBanner: React.FC = () => {
  const { user } = useAuth();
  const displayName = getDisplayName(user);

  return (
    <div className="bg-accent-soft rounded-2xl p-5 sm:p-6 mb-6 text-center">
      <p className="text-sm text-accent/70">
        {getGreeting()}, <span className="font-medium text-accent">{displayName}</span>
      </p>
      <p className="text-base sm:text-lg font-medium text-ink mt-1">{getDailyPhrase()}</p>
    </div>
  );
};
