import React from 'react';
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { Habit } from '../../types';
import { addDays, getFriendlyDateLabel, isToday } from '../../utils/dateUtils';
import { getTaskStatus, statusLabel } from '../../utils/habitStats';
import { StatusIcon } from './StatusIcon';

interface DailyViewProps {
  habits: Habit[];
  selectedDate: string;
  onDateChange: (date: string) => void;
  onToggleHabit: (habitId: number, date: string, action: 'complete' | 'postpone' | 'clear') => void;
  onDeleteHabit: (habitId: number) => void;
}

export const DailyView: React.FC<DailyViewProps> = ({
  habits,
  selectedDate,
  onDateChange,
  onToggleHabit,
  onDeleteHabit,
}) => {
  const editable = isToday(selectedDate);
  const completedCount = habits.filter(h => h.completedDates?.includes(selectedDate)).length;
  const total = habits.length;

  const handleTap = (habit: Habit) => {
    if (!editable) return;
    const status = getTaskStatus(habit, selectedDate);
    if (status === 'upcoming' || status === 'missed') {
      onToggleHabit(habit.id, selectedDate, 'complete');
    } else if (status === 'completed') {
      onToggleHabit(habit.id, selectedDate, 'postpone');
    } else {
      onToggleHabit(habit.id, selectedDate, 'clear');
    }
  };

  return (
    <div className="animate-view-enter">
      {/* Date header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onDateChange(addDays(selectedDate, -1))}
          className="p-2.5 rounded-full text-faint hover:text-ink hover:bg-inset transition-colors"
          aria-label="Previous day"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
            {getFriendlyDateLabel(selectedDate)}
          </h2>
          <p className="text-sm text-soft mt-0.5">{selectedDate}</p>
        </div>

        <button
          onClick={() => onDateChange(addDays(selectedDate, 1))}
          className="p-2.5 rounded-full text-faint hover:text-ink hover:bg-inset transition-colors"
          aria-label="Next day"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Progress indicator */}
      {total > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-soft mb-2">
            <span>Today's progress</span>
            <span className="font-medium text-ink">{completedCount} of {total}</span>
          </div>
          <div className="h-2 rounded-full bg-inset overflow-hidden">
            <div
              className="h-full rounded-full bg-status-completed transition-all duration-500"
              style={{ width: `${total > 0 ? (completedCount / total) * 100 : 0}%` }}
            />
          </div>
        </div>
      )}

      {/* Task list */}
      <div className="rounded-2xl border border-edge divide-y divide-edge overflow-hidden">
        {habits.map(habit => {
          const status = getTaskStatus(habit, selectedDate);
          return (
            <div
              key={habit.id}
              className="w-full flex items-center gap-4 px-5 py-4 group hover:bg-inset transition-colors"
            >
              <button
                onClick={() => handleTap(habit)}
                disabled={!editable}
                className={`flex items-center gap-4 flex-1 text-left min-w-0 ${
                  editable ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                <StatusIcon status={status} size="lg" />
                <span className="flex-1 text-ink font-medium truncate">{habit.name}</span>
                <span className="text-sm text-soft hidden sm:inline">{statusLabel[status]}</span>
              </button>
              <button
                onClick={() => onDeleteHabit(habit.id)}
                className="p-2.5 -my-1 rounded-lg text-faint hover:text-status-missed hover:bg-status-missed-soft transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                aria-label={`Delete ${habit.name}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {!editable && (
        <p className="text-center text-sm text-soft mt-4">
          You can only mark habits done on today
        </p>
      )}
    </div>
  );
};
