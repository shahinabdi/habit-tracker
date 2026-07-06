import React, { useState } from 'react';
import { Habit } from '../../types';
import { getWeekDates } from '../../utils/dateUtils';
import { DailyView } from './DailyView';
import { WeeklyView } from './WeeklyView';
import { MonthlyView } from './MonthlyView';

type ViewMode = 'day' | 'week' | 'month';

interface CalendarViewProps {
  habits: Habit[];
  selectedDate: string;
  onDateChange: (date: string) => void;
  onToggleHabit: (habitId: number, date: string, action: 'complete' | 'postpone' | 'clear') => void;
  onDeleteHabit: (habitId: number) => void;
}

const viewOptions: { id: ViewMode; label: string }[] = [
  { id: 'day', label: 'Day' },
  { id: 'week', label: 'Week' },
  { id: 'month', label: 'Month' },
];

export const CalendarView: React.FC<CalendarViewProps> = ({
  habits,
  selectedDate,
  onDateChange,
  onToggleHabit,
  onDeleteHabit,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('day');

  const openDay = (date: string) => {
    onDateChange(date);
    setViewMode('day');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="flex justify-center mb-6">
        <div className="inline-flex bg-gray-50 rounded-xl p-1 gap-1">
          {viewOptions.map(option => (
            <button
              key={option.id}
              onClick={() => setViewMode(option.id)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                viewMode === option.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {viewMode === 'day' && (
        <DailyView
          habits={habits}
          selectedDate={selectedDate}
          onDateChange={onDateChange}
          onToggleHabit={onToggleHabit}
          onDeleteHabit={onDeleteHabit}
        />
      )}

      {viewMode === 'week' && (
        <WeeklyView
          habits={habits}
          weekDates={getWeekDates(selectedDate)}
          selectedDate={selectedDate}
          onDateChange={onDateChange}
          onOpenDay={openDay}
        />
      )}

      {viewMode === 'month' && (
        <MonthlyView
          habits={habits}
          selectedDate={selectedDate}
          onDateChange={onDateChange}
          onOpenDay={openDay}
        />
      )}
    </div>
  );
};
