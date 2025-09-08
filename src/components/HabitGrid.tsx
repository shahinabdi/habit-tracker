import React from 'react';
import { Trash2, Flame } from 'lucide-react';
import { Habit } from '../types';
import { getDaysInMonth, formatDate, calculateStreak } from '../utils/dateUtils';

interface HabitGridProps {
  habits: Habit[];
  currentMonth: number;
  currentYear: number;
  onToggleHabit: (habitId: number, date: string) => void;
  onDeleteHabit: (habitId: number) => void;
}

export const HabitGrid: React.FC<HabitGridProps> = ({
  habits,
  currentMonth,
  currentYear,
  onToggleHabit,
  onDeleteHabit,
}) => {
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const isHabitCompleted = (habit: Habit, day: number): boolean => {
    const date = new Date(currentYear, currentMonth, day);
    const dateString = formatDate(date);
    return habit.completedDates.includes(dateString);
  };

  const handleCellClick = (habitId: number, day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const dateString = formatDate(date);
    onToggleHabit(habitId, dateString);
  };

  if (habits.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Flame className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No habits yet</h3>
        <p className="text-sm sm:text-base text-gray-600 px-4">Add your first habit above to get started on your journey!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-[600px] sm:min-w-[800px]">
          {/* Header Row */}
          <div className="grid gap-1 p-3 sm:p-4 pb-2 bg-gray-50/50" style={{
            gridTemplateColumns: `minmax(120px, 200px) repeat(${daysInMonth}, minmax(24px, 32px)) minmax(60px, 80px)`
          }}>
            <div className="font-semibold text-gray-900 text-xs sm:text-sm">Habits</div>
            {days.map(day => (
              <div key={day} className="text-center text-xs font-medium text-gray-600 py-1 min-w-0">
                {day}
              </div>
            ))}
            <div className="text-center font-semibold text-gray-900 text-xs sm:text-sm">Streak</div>
          </div>

          {/* Habit Rows */}
          <div className="p-3 sm:p-4 pt-2">
            {habits.map((habit, index) => (
              <div
                key={habit.id}
                className={`grid gap-1 items-center py-2 sm:py-3 ${
                  index !== habits.length - 1 ? 'border-b border-gray-100' : ''
                }`}
                style={{
                  gridTemplateColumns: `minmax(120px, 200px) repeat(${daysInMonth}, minmax(24px, 32px)) minmax(60px, 80px)`
                }}
              >
                {/* Habit Name and Delete Button */}
                <div className="flex items-center justify-between pr-2 sm:pr-4 min-w-0">
                  <span className="font-medium text-gray-900 text-xs sm:text-sm truncate flex-1 mr-2">
                    {habit.name}
                  </span>
                  <button
                    onClick={() => onDeleteHabit(habit.id)}
                    className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-all duration-200 flex-shrink-0"
                    aria-label={`Delete ${habit.name} habit`}
                  >
                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                </div>

                {/* Day Cells */}
                {days.map(day => {
                  const isCompleted = isHabitCompleted(habit, day);
                  const today = new Date();
                  const cellDate = new Date(currentYear, currentMonth, day);
                  const isToday = cellDate.toDateString() === today.toDateString();
                  const isFuture = cellDate > today;

                  return (
                    <button
                      key={day}
                      onClick={() => !isFuture && handleCellClick(habit.id, day)}
                      disabled={isFuture}
                      className={`
                        w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg transition-all duration-200 border-2 min-w-0
                        ${isCompleted
                          ? 'bg-emerald-500 border-emerald-500 text-white scale-105'
                          : isFuture
                          ? 'bg-gray-50 border-gray-100 cursor-not-allowed'
                          : 'bg-white border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'
                        }
                        ${isToday && !isCompleted ? 'ring-2 ring-emerald-200' : ''}
                        ${!isFuture ? 'cursor-pointer' : ''}
                      `}
                      aria-label={`Mark ${habit.name} as ${isCompleted ? 'incomplete' : 'complete'} for day ${day}`}
                    >
                      {isCompleted && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></div>
                        </div>
                      )}
                    </button>
                  );
                })}

                {/* Streak Counter */}
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Flame className="h-3 w-3 sm:h-4 sm:w-4 text-orange-500" />
                    <span className="font-bold text-orange-600 text-xs sm:text-sm">
                      {calculateStreak(habit.completedDates, currentMonth, currentYear)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};