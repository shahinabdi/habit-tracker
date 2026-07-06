import React from 'react';
import { Target, TrendingUp, Award, Coffee, Github, Linkedin } from 'lucide-react';
import { HabitData } from '../types';
import { getDaysInMonth, getMonthName, parseDateString } from '../utils/dateUtils';

interface StatsProps {
  habitData: HabitData;
  selectedDate: string;
}

export const Stats: React.FC<StatsProps> = ({ habitData, selectedDate }) => {
  const anchor = parseDateString(selectedDate);
  const currentMonth = anchor.getMonth();
  const currentYear = anchor.getFullYear();

  const calculateStats = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const currentMonthStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;

    let totalCompletions = 0;
    let totalPostponed = 0;
    const totalPossible = habitData.habits.length * daysInMonth;
    let bestStreak = 0;

    habitData.habits.forEach(habit => {
      const monthCompletions = habit.completedDates.filter(date =>
        date.startsWith(currentMonthStr)
      ).length;
      totalCompletions += monthCompletions;

      const monthPostponed = habit.postponedDates.filter(date =>
        date.startsWith(currentMonthStr)
      ).length;
      totalPostponed += monthPostponed;

      // Calculate streaks for completed habits only
      let streak = 0;
      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${currentMonthStr}-${String(day).padStart(2, '0')}`;
        if (habit.completedDates.includes(dateStr)) {
          streak++;
        } else {
          if (streak > bestStreak) bestStreak = streak;
          streak = 0;
        }
      }
      if (streak > bestStreak) bestStreak = streak;
    });

    const completionRate = totalPossible > 0 ? (totalCompletions / totalPossible) * 100 : 0;

    return {
      totalHabits: habitData.habits.length,
      totalCompletions,
      totalPostponed,
      completionRate: Math.round(completionRate),
      bestStreak,
    };
  };

  const stats = calculateStats();

  const tiles = [
    { icon: Target, value: stats.totalHabits, label: 'Active Habits' },
    { icon: TrendingUp, value: stats.totalCompletions, label: 'Completed' },
    { icon: TrendingUp, value: stats.totalPostponed, label: 'Postponed' },
    { icon: Award, value: `${stats.completionRate}%`, label: 'Success Rate' },
    { icon: TrendingUp, value: stats.bestStreak, label: 'Best Streak' },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Current Month Stats */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800">
            {getMonthName(currentMonth)} Statistics
          </h3>
          <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
            {currentYear}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {tiles.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center p-4 bg-gray-50 rounded-xl">
              <Icon className="w-5 h-5 text-gray-400 mx-auto mb-2" />
              <div className="text-xl sm:text-2xl font-bold text-gray-800">{value}</div>
              <div className="text-xs text-gray-500 font-medium mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Developer Support Section */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Support the Developer</h3>

        <p className="text-gray-500 text-sm mb-5 leading-relaxed">
          Enjoying Habit Tracker? Your support helps keep this project free and actively maintained.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <a
            href="https://buymeacoffee.com/shahinabdi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-50 text-amber-700 rounded-xl hover:bg-amber-100 transition-colors font-medium text-sm"
          >
            <Coffee className="w-4 h-4" />
            Buy me a coffee
          </a>

          <a
            href="https://github.com/shahinabdi/habit-tracker"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors font-medium text-sm"
          >
            <Github className="w-4 h-4" />
            Star on GitHub
          </a>
        </div>

        <div className="flex justify-center gap-3">
          <a
            href="https://github.com/shahinabdi"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-gray-50 rounded-xl text-gray-500 hover:text-gray-800 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/shahinabdi"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-gray-50 rounded-xl text-blue-500 hover:text-blue-700 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Project Info */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">About This App</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <div className="flex justify-between p-3 bg-gray-50 rounded-xl text-sm">
            <span className="text-gray-500">Version</span>
            <span className="font-medium text-gray-700">1.0.0</span>
          </div>
          <div className="flex justify-between p-3 bg-gray-50 rounded-xl text-sm">
            <span className="text-gray-500">Developer</span>
            <span className="font-medium text-gray-700">Shahin ABDI</span>
          </div>
          <div className="flex justify-between p-3 bg-gray-50 rounded-xl text-sm">
            <span className="text-gray-500">Technology</span>
            <span className="font-medium text-gray-700">React + TypeScript</span>
          </div>
          <div className="flex justify-between p-3 bg-gray-50 rounded-xl text-sm">
            <span className="text-gray-500">License</span>
            <span className="font-medium text-gray-700">MIT</span>
          </div>
        </div>

        <div className="p-4 bg-emerald-50 rounded-xl">
          <h4 className="text-sm font-semibold text-emerald-800 mb-1.5">Privacy First Design</h4>
          <p className="text-xs text-emerald-700 leading-relaxed">
            All your habit data is stored locally on your device. No servers, no tracking,
            no data collection. Your progress stays completely private.
          </p>
        </div>
      </div>
    </div>
  );
};
