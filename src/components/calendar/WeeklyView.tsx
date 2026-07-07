import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Habit } from '../../types';
import { addDays, getDayNameShort, getMonthName, isToday, parseDateString } from '../../utils/dateUtils';
import { getDayCounts, getDayCategory, DayCategory } from '../../utils/habitStats';

interface WeeklyViewProps {
  habits: Habit[];
  weekDates: string[];
  selectedDate: string;
  onDateChange: (date: string) => void;
  onOpenDay: (date: string) => void;
}

// CSS-variable references keep the rings theme-reactive in light and dark mode.
const ringColor: Record<DayCategory, string> = {
  completed: 'rgb(var(--status-completed))',
  partial: 'rgb(var(--status-partial))',
  missed: 'rgb(var(--status-missed))',
  upcoming: 'rgb(var(--inset))',
  none: 'rgb(var(--inset))',
};

export const WeeklyView: React.FC<WeeklyViewProps> = ({
  habits,
  weekDates,
  onDateChange,
  onOpenDay,
}) => {
  const first = weekDates[0];
  const last = weekDates[6];
  const rangeLabel = (() => {
    const firstDate = new Date(`${first}T00:00:00`);
    const lastDate = new Date(`${last}T00:00:00`);
    const firstLabel = `${getMonthName(firstDate.getMonth())} ${firstDate.getDate()}`;
    const lastLabel =
      firstDate.getMonth() === lastDate.getMonth()
        ? `${lastDate.getDate()}`
        : `${getMonthName(lastDate.getMonth())} ${lastDate.getDate()}`;
    return `${firstLabel} – ${lastLabel}, ${lastDate.getFullYear()}`;
  })();

  return (
    <div className="animate-view-enter">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onDateChange(addDays(first, -7))}
          className="p-2.5 rounded-full text-faint hover:text-ink hover:bg-inset transition-colors"
          aria-label="Previous week"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-base sm:text-lg font-semibold text-ink">{rangeLabel}</h2>
        <button
          onClick={() => onDateChange(addDays(first, 7))}
          className="p-2.5 rounded-full text-faint hover:text-ink hover:bg-inset transition-colors"
          aria-label="Next week"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto sm:grid sm:grid-cols-7 sm:gap-2 sm:overflow-visible px-1 pb-2 snap-x">
        {weekDates.map(date => {
          const counts = getDayCounts(habits, date);
          const category = getDayCategory(date, counts);
          const ratio = counts.total > 0 ? counts.completed / counts.total : 0;
          const color = ringColor[category];
          const today = isToday(date);
          const day = parseDateString(date).getDate();

          return (
            <button
              key={date}
              onClick={() => onOpenDay(date)}
              className="flex-shrink-0 snap-center flex flex-col items-center gap-2 rounded-2xl py-3 px-2 hover:bg-inset transition-colors"
            >
              <span className="text-sm font-medium text-soft">{getDayNameShort(date)}</span>
              <div
                className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full ${
                  today ? 'ring-2 ring-today ring-offset-2 ring-offset-surface' : ''
                }`}
                style={{
                  background:
                    ratio > 0
                      ? `conic-gradient(${color} ${ratio * 360}deg, rgb(var(--inset)) 0deg)`
                      : 'rgb(var(--inset))',
                }}
              >
                <div className="absolute inset-[3px] rounded-full bg-surface flex items-center justify-center">
                  <span className="text-sm font-semibold text-ink">{day}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
