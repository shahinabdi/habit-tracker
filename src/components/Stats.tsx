import React from 'react';
import { Calendar, Target, TrendingUp, Award, Coffee, Heart, Github, Linkedin } from 'lucide-react';
import { HabitData } from '../types';
import { getDaysInMonth } from '../utils/dateUtils';

interface StatsProps {
  habitData: HabitData;
  currentMonth: number;
  currentYear: number;
}

export const Stats: React.FC<StatsProps> = ({ habitData, currentMonth, currentYear }) => {
  const calculateStats = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const currentMonthStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
    
    let totalCompletions = 0;
    let totalPossible = habitData.habits.length * daysInMonth;
    let bestStreak = 0;
    let currentStreaks = 0;

    habitData.habits.forEach(habit => {
      const monthCompletions = habit.completedDates.filter(date => 
        date.startsWith(currentMonthStr)
      ).length;
      totalCompletions += monthCompletions;

      // Calculate streaks (simplified - just for current month)
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
      currentStreaks += streak;
    });

    const completionRate = totalPossible > 0 ? (totalCompletions / totalPossible) * 100 : 0;
    
    return {
      totalHabits: habitData.habits.length,
      totalCompletions,
      completionRate: Math.round(completionRate),
      bestStreak,
      averageDaily: habitData.habits.length > 0 ? Math.round(totalCompletions / daysInMonth) : 0
    };
  };

  const stats = calculateStats();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="space-y-6">
      {/* Current Month Stats */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            {monthNames[currentMonth]} {currentYear} Statistics
          </h3>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-emerald-50 rounded-lg">
            <Target className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-emerald-700">{stats.totalHabits}</div>
            <div className="text-xs text-emerald-600">Active Habits</div>
          </div>

          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">{stats.totalCompletions}</div>
            <div className="text-xs text-blue-600">Completions</div>
          </div>

          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <Award className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-700">{stats.completionRate}%</div>
            <div className="text-xs text-purple-600">Success Rate</div>
          </div>

          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <TrendingUp className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-700">{stats.bestStreak}</div>
            <div className="text-xs text-orange-600">Best Streak</div>
          </div>
        </div>
      </div>

      {/* Developer Support Section */}
      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border border-emerald-200 p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-red-500" />
          <h3 className="text-lg font-semibold text-gray-800">Support the Developer</h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">
          Enjoying Habit Tracker? Your support helps keep this project free and actively maintained!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <a
            href="https://buymeacoffee.com/shahinabdi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors font-medium"
          >
            <Coffee className="w-4 h-4" />
            Buy me a coffee
          </a>
          
          <a
            href="https://github.com/shahinabdi/habit-tracker"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
          >
            <Github className="w-4 h-4" />
            Star on GitHub
          </a>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">Connect with the developer:</p>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/shahinabdi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/shahinabdi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">About This App</h3>
        
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Version:</span>
            <span className="font-mono">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span>Developer:</span>
            <span>Shahin ABDI</span>
          </div>
          <div className="flex justify-between">
            <span>Technology:</span>
            <span>React + TypeScript</span>
          </div>
          <div className="flex justify-between">
            <span>License:</span>
            <span>MIT</span>
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600">
            <strong>Privacy First:</strong> All your data is stored locally on your device. 
            No servers, no tracking, no data collection. Your habits stay private!
          </p>
        </div>
      </div>
    </div>
  );
};
