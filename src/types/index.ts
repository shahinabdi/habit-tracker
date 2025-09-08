export interface Habit {
  id: number;
  name: string;
  completedDates: string[];
}

export interface HabitData {
  habits: Habit[];
}