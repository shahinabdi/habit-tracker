import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface HabitInputProps {
  onAddHabit: (name: string) => void;
}

export const HabitInput: React.FC<HabitInputProps> = ({ onAddHabit }) => {
  const [habitName, setHabitName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (habitName.trim()) {
      onAddHabit(habitName.trim());
      setHabitName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            placeholder="Add a new habit..."
            className="w-full px-4 py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 placeholder-gray-400"
            maxLength={50}
          />
        </div>
        <button
          type="submit"
          disabled={!habitName.trim()}
          className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 font-medium text-sm sm:text-base whitespace-nowrap"
        >
          <Plus className="h-4 w-4" />
          <span>Add</span>
        </button>
      </div>
    </form>
  );
};