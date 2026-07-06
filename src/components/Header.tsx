import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-6 sm:mb-8 pt-2">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Habit Tracker</h1>
      <p className="text-sm text-gray-400 mt-1">Build positive habits, one day at a time</p>
    </header>
  );
};
