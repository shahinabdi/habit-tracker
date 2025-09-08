import React from 'react';
import { Calendar, Target, TrendingUp, Award, Coffee, Heart, Github, Linkedin } from 'lucide-react';
import { HabitData } from '../types';
import { getDaysInMonth } from '../utils/dateUtils';
import { HabitCalendar } from './HabitCalendar';

interface StatsProps {
  habitData: HabitData;
  currentMonth: number;
  currentYear: number;
  onMonthChange: (month: number, year: number) => void;
}

export const Stats: React.FC<StatsProps> = ({ habitData, currentMonth, currentYear, onMonthChange }) => {
  const calculateStats = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const currentMonthStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
    
    let totalCompletions = 0;
    let totalPostponed = 0;
    let totalPossible = habitData.habits.length * daysInMonth;
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
      averageDaily: habitData.habits.length > 0 ? Math.round(totalCompletions / daysInMonth) : 0
    };
  };

  const stats = calculateStats();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Habit Calendar */}
      <div className="w-full">
        <HabitCalendar
          habitData={habitData}
          currentMonth={currentMonth}
          currentYear={currentYear}
          onMonthChange={onMonthChange}
        />
      </div>

      {/* Current Month Stats */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <div className="p-1.5 sm:p-2 bg-emerald-100 rounded-lg">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
            </div>
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800">
              {monthNames[currentMonth]} Statistics
            </h3>
          </div>
          <div className="sm:ml-auto">
            <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {currentYear}
            </span>
          </div>
        </div>

        {/* Responsive Stats Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="group text-center p-3 sm:p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200/50 hover:shadow-md transition-all duration-200 hover:scale-105">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-700">{stats.totalHabits}</div>
            <div className="text-xs sm:text-sm text-emerald-600 font-medium">Active Habits</div>
          </div>

          <div className="group text-center p-3 sm:p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200/50 hover:shadow-md transition-all duration-200 hover:scale-105">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-700">{stats.totalCompletions}</div>
            <div className="text-xs sm:text-sm text-green-600 font-medium">Completed</div>
          </div>

          <div className="group text-center p-3 sm:p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200/50 hover:shadow-md transition-all duration-200 hover:scale-105">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-700">{stats.totalPostponed}</div>
            <div className="text-xs sm:text-sm text-yellow-600 font-medium">Postponed</div>
          </div>

          <div className="group text-center p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200/50 hover:shadow-md transition-all duration-200 hover:scale-105 xs:col-span-2 sm:col-span-1">
            <Award className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-700">{stats.completionRate}%</div>
            <div className="text-xs sm:text-sm text-purple-600 font-medium">Success Rate</div>
          </div>

          <div className="group text-center p-3 sm:p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200/50 hover:shadow-md transition-all duration-200 hover:scale-105 xs:col-span-2 sm:col-span-3 lg:col-span-1">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-700">{stats.bestStreak}</div>
            <div className="text-xs sm:text-sm text-orange-600 font-medium">Best Streak</div>
          </div>
        </div>
      </div>

      {/* Developer Support Section */}
      <div className="bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 rounded-xl sm:rounded-2xl border border-emerald-200/50 p-4 sm:p-6 lg:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-red-100 rounded-lg">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
            </div>
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800">Support the Developer</h3>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
          Enjoying Habit Tracker? Your support helps keep this project free and actively maintained for everyone!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
          <a
            href="https://buymeacoffee.com/shahinabdi"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 font-medium hover:scale-105 hover:shadow-lg"
          >
            <Coffee className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
            <span className="text-sm sm:text-base">Buy me a coffee</span>
          </a>
          
          <a
            href="https://github.com/shahinabdi/habit-tracker"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl hover:from-gray-900 hover:to-black transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            <Github className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
            <span className="text-sm sm:text-base">Star on GitHub</span>
          </a>
        </div>

        <div className="text-center bg-white/50 rounded-xl p-4 sm:p-6 backdrop-blur-sm border border-white/20">
          <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 font-medium">Connect with the developer:</p>
          <div className="flex justify-center gap-4 sm:gap-6">
            <a
              href="https://github.com/shahinabdi"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-2 sm:p-3 bg-white rounded-xl shadow-sm border border-gray-200 text-gray-600 hover:text-gray-800 hover:shadow-md transition-all duration-200 hover:scale-110"
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://linkedin.com/in/shahinabdi"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-2 sm:p-3 bg-white rounded-xl shadow-sm border border-gray-200 text-blue-600 hover:text-blue-800 hover:shadow-md transition-all duration-200 hover:scale-110"
            >
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-lg">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
          </div>
          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800">About This App</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2 p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
              <span className="text-sm font-medium text-gray-700">Version:</span>
              <span className="text-sm font-mono text-indigo-600 bg-indigo-50 px-2 py-1 rounded">1.0.0</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2 p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
              <span className="text-sm font-medium text-gray-700">Developer:</span>
              <span className="text-sm font-semibold text-gray-800">Shahin ABDI</span>
            </div>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2 p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
              <span className="text-sm font-medium text-gray-700">Technology:</span>
              <span className="text-sm font-semibold text-blue-600">React + TypeScript</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2 p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
              <span className="text-sm font-medium text-gray-700">License:</span>
              <span className="text-sm font-mono text-green-600 bg-green-50 px-2 py-1 rounded">MIT</span>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200/50">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-2">Privacy First Design</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                All your habit data is stored locally on your device using browser storage. 
                No servers, no tracking, no data collection, no analytics. 
                Your personal habits and progress stay completely private and secure!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
