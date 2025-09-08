import React from 'react';
import { ChevronLeft, ChevronRight, Coffee, Github, Heart } from 'lucide-react';
import { getMonthName } from '../utils/dateUtils';

interface HeaderProps {
  currentMonth: number;
  currentYear: number;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMonth,
  currentYear,
  onPreviousMonth,
  onNextMonth,
}) => {
  return (
    <header className="mb-6 sm:mb-8">
      {/* Developer Branding Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg p-3 sm:p-4 mb-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-300" />
              <span className="font-semibold">Made with love by Shahin ABDI</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <a
              href="https://buymeacoffee.com/shahinabdi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium hover:bg-yellow-300 transition-colors"
            >
              <Coffee className="w-3 h-3" />
              Support
            </a>
            <a
              href="https://github.com/shahinabdi/habit-tracker"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium hover:bg-opacity-30 transition-colors"
            >
              <Github className="w-3 h-3" />
              Star
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Habit Tracker</h1>
          <div className="hidden sm:block h-6 w-px bg-gray-300"></div>
          <p className="text-xs sm:text-sm text-gray-600">Build positive habits, one day at a time</p>
        </div>
        
        <div className="flex items-center justify-center sm:justify-end space-x-4">
          <button
            onClick={onPreviousMonth}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 min-w-[140px] sm:min-w-[180px] text-center">
            {getMonthName(currentMonth)} {currentYear}
          </h2>
          
          <button
            onClick={onNextMonth}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
};