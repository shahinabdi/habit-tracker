import React from 'react';
import { Stats } from '../components/Stats';
import { useHabits } from '../hooks/useHabits';
import { getTodayString } from '../utils/dateUtils';

export const StatsPage: React.FC = () => {
  const { habitData, loading } = useHabits();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  return <Stats habitData={habitData} selectedDate={getTodayString()} />;
};
