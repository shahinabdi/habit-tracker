import React from 'react';
import { Trash2, Flame, Check, Clock, X } from 'lucide-react';
import { Habit } from '../types';
import { getDaysInMonth, formatDate, isToday, isFutureDate, isPastDate } from '../utils/dateUtils';

interface HabitGridProps {
  habits: Habit[];
  currentMonth: number;
  currentYear: number;
  onToggleHabit: (habitId: number, date: string, action: 'complete' | 'postpone' | 'clear') => void;
  onDeleteHabit: (habitId: number) => void;
}

export const HabitGrid: React.FC<HabitGridProps> = ({
  habits,
  currentMonth,
  currentYear,
  onToggleHabit,
  onDeleteHabit,
}) => {
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getHabitStatus = (habit: Habit, day: number): 'completed' | 'postponed' | 'not-done' => {
    const dateString = formatDate(currentYear, currentMonth, day);
    if (habit.completedDates?.includes(dateString)) return 'completed';
    if (habit.postponedDates?.includes(dateString)) return 'postponed';
    return 'not-done';
  };

  const handleCellClick = (habitId: number, day: number) => {
    const dateString = formatDate(currentYear, currentMonth, day);
    const today = new Date();
    const cellDate = new Date(currentYear, currentMonth, day);
    
    // Only allow interaction for today
    if (cellDate.toDateString() !== today.toDateString()) {
      return;
    }

    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    const currentStatus = getHabitStatus(habit, day);
    
    // Cycle through states: not-done -> completed -> postponed -> not-done
    if (currentStatus === 'not-done') {
      onToggleHabit(habitId, dateString, 'complete');
    } else if (currentStatus === 'completed') {
      onToggleHabit(habitId, dateString, 'postpone');
    } else {
      onToggleHabit(habitId, dateString, 'clear');
    }
  };

  const calculateStreak = (completedDates: string[]): number => {
    if (!completedDates || completedDates.length === 0) return 0;
    
    const today = new Date();
    const sortedDates = completedDates
      .map(date => new Date(date))
      .filter(date => date <= today)
      .sort((a, b) => b.getTime() - a.getTime());
    
    if (sortedDates.length === 0) return 0;
    
    let streak = 0;
    let currentDate = new Date(today);
    currentDate.setHours(0, 0, 0, 0);
    
    // Check if today or yesterday was completed
    const lastCompletedDate = new Date(sortedDates[0]);
    lastCompletedDate.setHours(0, 0, 0, 0);
    
    const daysDiff = Math.floor((currentDate.getTime() - lastCompletedDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff > 1) return 0; // Streak broken
    
    // Count consecutive days
    for (let i = 0; i < sortedDates.length; i++) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
      
      if (i + 1 < sortedDates.length) {
        const nextDate = new Date(sortedDates[i + 1]);
        nextDate.setHours(0, 0, 0, 0);
        const expectedDate = new Date(currentDate);
        
        if (nextDate.getTime() !== expectedDate.getTime()) {
          break;
        }
      } else {
        break;
      }
    }
    
    return streak;
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
                  const status = getHabitStatus(habit, day);
                  const today = new Date();
                  const cellDate = new Date(currentYear, currentMonth, day);
                  const isTodayCell = cellDate.toDateString() === today.toDateString();
                  const isFuture = cellDate > today;
                  const isPast = cellDate < today;

                  // Define cell colors based on status
                  let cellClasses = 'w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg transition-all duration-200 border-2 min-w-0 relative ';
                  
                  if (isFuture) {
                    cellClasses += 'bg-gray-50 border-gray-100 cursor-not-allowed';
                  } else if (status === 'completed') {
                    cellClasses += 'bg-green-500 border-green-500 text-white cursor-pointer hover:bg-green-600';
                  } else if (status === 'postponed') {
                    cellClasses += 'bg-yellow-400 border-yellow-400 text-white cursor-pointer hover:bg-yellow-500';
                  } else {
                    if (isTodayCell) {
                      cellClasses += 'bg-white border-gray-300 cursor-pointer hover:border-green-300 hover:bg-green-50 ring-2 ring-blue-200';
                    } else if (isPast) {
                      cellClasses += 'bg-red-100 border-red-200 cursor-not-allowed';
                    } else {
                      cellClasses += 'bg-white border-gray-200 cursor-pointer hover:border-green-300 hover:bg-green-50';
                    }
                  }

                  const isClickable = isTodayCell;

                  return (
                    <button
                      key={day}
                      onClick={() => isClickable && handleCellClick(habit.id, day)}
                      disabled={!isClickable}
                      className={cellClasses}
                      title={
                        isFuture 
                          ? 'Future date - not available'
                          : isPast && status === 'not-done'
                          ? 'Past date - missed'
                          : isTodayCell
                          ? `Today - Click to cycle: ${status === 'not-done' ? 'mark complete' : status === 'completed' ? 'mark postponed' : 'mark not done'}`
                          : status === 'completed'
                          ? 'Completed'
                          : status === 'postponed'
                          ? 'Postponed'
                          : 'Not done'
                      }
                      aria-label={`${habit.name} for day ${day}: ${status}`}
                    >
                      {status === 'completed' && (
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white absolute inset-0 m-auto" />
                      )}
                      {status === 'postponed' && (
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-white absolute inset-0 m-auto" />
                      )}
                      {isPast && status === 'not-done' && (
                        <X className="w-3 h-3 sm:w-4 sm:h-4 text-red-400 absolute inset-0 m-auto" />
                      )}
                    </button>
                  );
                })}

                {/* Streak Counter */}
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Flame className="h-3 w-3 sm:h-4 sm:w-4 text-orange-500" />
                    <span className="font-bold text-orange-600 text-xs sm:text-sm">
                      {calculateStreak(habit.completedDates || [])}
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