import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getDailyPhrase, getGreeting } from '../utils/motivation';
import { getDisplayName } from '../utils/user';

export const WelcomeBanner: React.FC = () => {
  const { user } = useAuth();
  const displayName = getDisplayName(user);

  return (
    <div className="bg-emerald-50 rounded-2xl p-5 sm:p-6 mb-6 text-center">
      <p className="text-sm text-emerald-700/70">
        {getGreeting()}, <span className="font-medium text-emerald-800">{displayName}</span>
      </p>
      <p className="text-base sm:text-lg font-medium text-emerald-900 mt-1">{getDailyPhrase()}</p>
    </div>
  );
};
