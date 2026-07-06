import { Habit } from '../types';
import { addDays, getTodayString, isFutureDate, isToday } from './dateUtils';

export type DayCategory = 'completed' | 'partial' | 'missed' | 'upcoming' | 'none';
export type TaskStatus = 'completed' | 'postponed' | 'missed' | 'upcoming';

export interface DayCounts {
  completed: number;
  postponed: number;
  missed: number;
  total: number;
}

export const getDayCounts = (habits: Habit[], dateString: string): DayCounts => {
  let completed = 0;
  let postponed = 0;

  habits.forEach(habit => {
    if (habit.completedDates?.includes(dateString)) {
      completed++;
    } else if (habit.postponedDates?.includes(dateString)) {
      postponed++;
    }
  });

  const total = habits.length;
  return { completed, postponed, missed: total - completed - postponed, total };
};

// Aggregate category for a whole day, used by Weekly/Monthly views.
// A day that isn't over yet (today or future) is never "missed".
export const getDayCategory = (dateString: string, counts: DayCounts): DayCategory => {
  if (counts.total === 0) return 'none';

  if (isToday(dateString) || isFutureDate(dateString)) {
    if (counts.completed === counts.total) return 'completed';
    if (counts.completed > 0) return 'partial';
    return 'upcoming';
  }

  if (counts.completed === counts.total) return 'completed';
  if (counts.completed > 0) return 'partial';
  return 'missed';
};

// Per-habit status for a single day, used by Daily view task rows.
export const getTaskStatus = (habit: Habit, dateString: string): TaskStatus => {
  if (habit.completedDates?.includes(dateString)) return 'completed';
  if (habit.postponedDates?.includes(dateString)) return 'postponed';
  if (isToday(dateString) || isFutureDate(dateString)) return 'upcoming';
  return 'missed';
};

// Current active streak for a single habit: consecutive completed days ending today
// (or ending yesterday if today isn't marked done yet, so an ongoing streak isn't cut off early).
export const getCurrentStreak = (habit: Habit): number => {
  let cursor = getTodayString();
  if (!habit.completedDates?.includes(cursor)) {
    cursor = addDays(cursor, -1);
  }

  let streak = 0;
  while (habit.completedDates?.includes(cursor)) {
    streak++;
    cursor = addDays(cursor, -1);
  }
  return streak;
};

export const getBestCurrentStreak = (habits: Habit[]): number => {
  return habits.reduce((best, habit) => Math.max(best, getCurrentStreak(habit)), 0);
};

export const statusLabel: Record<DayCategory | TaskStatus, string> = {
  completed: 'Completed',
  partial: 'Partially done',
  postponed: 'Postponed',
  missed: 'Missed',
  upcoming: 'Upcoming',
  none: 'No data',
};
