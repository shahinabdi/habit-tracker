import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Habit } from '../../types';
import { addMonths, formatDate, getDaysInMonth, getMonthName, isToday, parseDateString } from '../../utils/dateUtils';
import { getDayCounts, getDayCategory } from '../../utils/habitStats';
import { StatusIcon } from './StatusIcon';

interface MonthlyViewProps {
  habits: Habit[];
  selectedDate: string;
  onDateChange: (date: string) => void;
  onOpenDay: (date: string) => void;
}

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const MonthlyView: React.FC<MonthlyViewProps> = ({
  habits,
  selectedDate,
  onDateChange,
  onOpenDay,
}) => {
  const anchor = parseDateString(selectedDate);
  const month = anchor.getMonth();
  const year = anchor.getFullYear();

  const daysInMonth = getDaysInMonth(month, year);
  const firstWeekday = new Date(year, month, 1).getDay();

  const leadingBlanks = Array.from({ length: firstWeekday }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="animate-view-enter">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onDateChange(addMonths(selectedDate, -1))}
          className="p-2.5 rounded-full text-faint hover:text-ink hover:bg-inset transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-base sm:text-lg font-semibold text-ink">
          {getMonthName(month)} {year}
        </h2>
        <button
          onClick={() => onDateChange(addMonths(selectedDate, 1))}
          className="p-2.5 rounded-full text-faint hover:text-ink hover:bg-inset transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-2">
        {dayNames.map(name => (
          <div key={name} className="text-center text-xs font-medium text-faint py-1">
            {name}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {leadingBlanks.map(i => (
          <div key={`blank-${i}`} />
        ))}

        {days.map(day => {
          const dateString = formatDate(year, month, day);
          const counts = getDayCounts(habits, dateString);
          const category = getDayCategory(dateString, counts);
          const today = isToday(dateString);

          return (
            <button
              key={day}
              onClick={() => onOpenDay(dateString)}
              className={`h-14 lg:h-16 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-colors hover:bg-inset ${
                today ? 'ring-2 ring-today ring-offset-1 ring-offset-surface bg-today-soft' : ''
              }`}
            >
              <span className={`text-sm font-medium ${today ? 'text-today' : 'text-ink'}`}>
                {day}
              </span>
              <StatusIcon status={category} size="sm" />
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-6 text-sm text-soft">
        <span className="flex items-center gap-1.5"><StatusIcon status="completed" size="sm" /> Completed</span>
        <span className="flex items-center gap-1.5"><StatusIcon status="partial" size="sm" /> Partial</span>
        <span className="flex items-center gap-1.5"><StatusIcon status="missed" size="sm" /> Missed</span>
        <span className="flex items-center gap-1.5"><StatusIcon status="none" size="sm" /> No data</span>
      </div>
    </div>
  );
};
