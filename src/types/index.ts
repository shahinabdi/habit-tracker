export interface Habit {
  id: number;
  name: string;
  completedDates: string[];
  postponedDates: string[];
}

export interface HabitData {
  habits: Habit[];
}