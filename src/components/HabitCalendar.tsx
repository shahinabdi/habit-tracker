import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Check, Clock, X, Circle, Target } from 'lucide-react';
import { HabitData } from '../types';
import { getDaysInMonth } from '../utils/dateUtils';

interface HabitCalendarProps {
  habitData: HabitData;
  currentMonth: number;
  currentYear: number;
  onMonthChange: (month: number, year: number) => void;
}

export const HabitCalendar: React.FC<HabitCalendarProps> = ({
  habitData,
  currentMonth,
  currentYear,
  onMonthChange
}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDayCompletionData = (day: number) => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    let completed = 0;
    let postponed = 0;
    let total = habitData.habits.length;

    habitData.habits.forEach(habit => {
      if (habit.completedDates?.includes(dateString)) {
        completed++;
      } else if (habit.postponedDates?.includes(dateString)) {
        postponed++;
      }
    });

    return { completed, postponed, total, dateString };
  };

  const getIntensityClass = (completed: number, total: number) => {
    if (total === 0) return 'bg-gray-100 border-gray-200';
    
    const ratio = completed / total;
    if (ratio === 1) return 'bg-green-500 border-green-600 text-white'; // 100%
    if (ratio >= 0.75) return 'bg-green-400 border-green-500 text-white'; // 75%+
    if (ratio >= 0.5) return 'bg-green-300 border-green-400'; // 50%+
    if (ratio >= 0.25) return 'bg-green-200 border-green-300'; // 25%+
    if (ratio > 0) return 'bg-green-100 border-green-200'; // Some completion
    return 'bg-gray-100 border-gray-200'; // None
  };

  const getPostponedClass = (postponed: number, total: number) => {
    if (total === 0 || postponed === 0) return '';
    
    const ratio = postponed / total;
    if (ratio >= 0.5) return 'ring-2 ring-yellow-400'; // 50%+ postponed
    if (ratio > 0) return 'ring-1 ring-yellow-300'; // Some postponed
    return '';
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    let newMonth = currentMonth;
    let newYear = currentYear;

    if (direction === 'prev') {
      newMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      newYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    } else {
      newMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      newYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    }

    onMonthChange(newMonth, newYear);
  };

  const getFirstDayOfMonth = () => {
    return new Date(currentYear, currentMonth, 1).getDay();
  };

  const getDaysInCurrentMonth = () => {
    return getDaysInMonth(currentMonth, currentYear);
  };

  const getDaysInPreviousMonth = () => {
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    return getDaysInMonth(prevMonth, prevYear);
  };

  const renderCalendarGrid = () => {
    const firstDay = getFirstDayOfMonth();
    const daysInMonth = getDaysInCurrentMonth();
    const daysInPrevMonth = getDaysInPreviousMonth();
    const totalCells = 42; // 6 rows × 7 days

    const cells = [];

    // Previous month's trailing days
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      cells.push(
        <div
          key={`prev-${day}`}
          className="h-8 sm:h-10 lg:h-12 flex items-center justify-center text-gray-300 text-xs sm:text-sm rounded-lg sm:rounded-xl"
        >
          {day}
        </div>
      );
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const { completed, postponed, total, dateString } = getDayCompletionData(day);
      const intensityClass = getIntensityClass(completed, total);
      const postponedClass = getPostponedClass(postponed, total);
      const today = new Date();
      const isToday = dateString === today.toISOString().split('T')[0];
      const missed = total - completed - postponed;
      
      // Enhanced visual feedback
      let statusIcon = null;
      if (total > 0) {
        if (completed === total) {
          // Perfect day - all habits completed
          statusIcon = <Check className="absolute top-0.5 right-0.5 w-2.5 h-2.5 text-green-700" />;
        } else if (postponed > 0 && completed === 0) {
          // All postponed
          statusIcon = <Clock className="absolute top-0.5 right-0.5 w-2.5 h-2.5 text-yellow-600" />;
        } else if (missed > 0 && completed === 0 && postponed === 0) {
          // All missed
          statusIcon = <X className="absolute top-0.5 right-0.5 w-2.5 h-2.5 text-red-500" />;
        } else if (completed > 0) {
          // Partial completion
          statusIcon = <Circle className="absolute top-0.5 right-0.5 w-2.5 h-2.5 text-green-600 fill-current" />;
        }
      }
      
      cells.push(
        <button
          key={day}
          onClick={() => setSelectedDate(selectedDate === dateString ? null : dateString)}
          className={`
            h-8 sm:h-10 lg:h-12 rounded-lg sm:rounded-xl border border-2 flex items-center justify-center text-xs sm:text-sm lg:text-base font-bold
            transition-all duration-200 relative group
            ${intensityClass} ${postponedClass}
            ${isToday ? 'ring-1 sm:ring-2 ring-blue-500 ring-offset-1 sm:ring-offset-2 shadow-lg shadow-blue-200/30' : ''}
            ${selectedDate === dateString ? 'ring-1 sm:ring-2 ring-purple-500 ring-offset-1 sm:ring-offset-2 shadow-lg shadow-purple-200/30 scale-105' : ''}
            ${total > 0 ? 'cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-emerald-200/30' : 'cursor-default opacity-60'}
          `}
          title={`${day} ${monthNames[currentMonth]}: ${completed} completed, ${postponed} postponed, ${missed} missed (${total} total habits)`}
        >
          <span className="relative z-10 drop-shadow-sm">{day}</span>
          
          {/* Enhanced Status icon with glow */}
          {statusIcon && (
            <div className="absolute top-1 right-1 p-0.5 rounded-full bg-white/80 backdrop-blur-sm shadow-md group-hover:scale-110 transition-transform duration-200">
              {statusIcon}
            </div>
          )}
          
          {/* Enhanced Today indicator */}
          {isToday && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-md">
              <Target className="w-1.5 h-1.5 text-white" />
            </div>
          )}
          
          {/* Enhanced Progress dots */}
          {total > 1 && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1 p-1 bg-white/60 backdrop-blur-sm rounded-full shadow-sm">
              {Array.from({ length: Math.min(total, 4) }).map((_, index) => {
                let dotColor = 'bg-gray-400';
                let shadowColor = 'shadow-gray-200';
                if (index < completed) {
                  dotColor = 'bg-green-500';
                  shadowColor = 'shadow-green-200';
                } else if (index < completed + postponed) {
                  dotColor = 'bg-yellow-400';
                  shadowColor = 'shadow-yellow-200';
                } else {
                  dotColor = 'bg-red-400';
                  shadowColor = 'shadow-red-200';
                }
                
                return (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full ${dotColor} ${shadowColor} shadow-sm group-hover:scale-110 transition-transform duration-200`}
                  />
                );
              })}
              {total > 4 && (
                <div className="text-xs text-gray-600 ml-1 font-bold">+</div>
              )}
            </div>
          )}
          
          {/* Enhanced Hover tooltip */}
          {total > 0 && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-30 whitespace-nowrap shadow-lg">
              <div className="text-center">
                <div>{completed}/{total} completed</div>
                {postponed > 0 && <div className="text-yellow-300">{postponed} postponed</div>}
              </div>
            </div>
          )}
        </button>
      );
    }

    // Next month's leading days
    const remainingCells = totalCells - cells.length;
    for (let day = 1; day <= remainingCells; day++) {
      cells.push(
        <div
          key={`next-${day}`}
          className="h-8 sm:h-10 lg:h-12 flex items-center justify-center text-gray-300 text-xs sm:text-sm rounded-lg sm:rounded-xl"
        >
          {day}
        </div>
      );
    }

    return cells;
  };

  const getSelectedDateDetails = () => {
    if (!selectedDate) return null;

    const day = parseInt(selectedDate.split('-')[2]);
    const { completed, postponed, total } = getDayCompletionData(day);
    
    const habitsForDate = habitData.habits.map(habit => ({
      name: habit.name,
      status: habit.completedDates?.includes(selectedDate) ? 'completed' :
              habit.postponedDates?.includes(selectedDate) ? 'postponed' : 'not-done'
    }));

    return {
      day,
      completed,
      postponed,
      total,
      habits: habitsForDate
    };
  };

  const selectedDetails = getSelectedDateDetails();

  // Calculate monthly statistics
  const getMonthlyStats = () => {
    const daysInMonth = getDaysInCurrentMonth();
    let totalCompletions = 0;
    let totalPostponed = 0;
    let totalPossible = 0;
    let activeDays = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const { completed, postponed, total } = getDayCompletionData(day);
      if (total > 0) {
        totalCompletions += completed;
        totalPostponed += postponed;
        totalPossible += total;
        activeDays++;
      }
    }

    return {
      totalCompletions,
      totalPostponed,
      totalPossible,
      activeDays,
      completionRate: totalPossible > 0 ? (totalCompletions / totalPossible) * 100 : 0,
      postponementRate: totalPossible > 0 ? (totalPostponed / totalPossible) * 100 : 0
    };
  };

  const monthlyStats = getMonthlyStats();

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg sm:rounded-2xl shadow-lg border border-gray-200/50 p-3 sm:p-6 lg:p-8 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg sm:rounded-xl shadow-md">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 truncate">Habit Calendar</h3>
            <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Track your progress over time</p>
          </div>
        </div>
        
        <div className="flex items-center gap-0.5 sm:gap-1 bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-0.5 sm:p-1">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-1.5 sm:p-2 hover:bg-emerald-50 hover:text-emerald-700 rounded-md sm:rounded-lg transition-all duration-200 group"
            title="Previous month"
          >
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
          </button>
          
          <div className="px-2 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-md sm:rounded-lg">
            <h4 className="text-sm sm:text-base font-bold text-emerald-800 min-w-[100px] sm:min-w-[140px] text-center">
              {monthNames[currentMonth]} {currentYear}
            </h4>
          </div>
          
          <button
            onClick={() => navigateMonth('next')}
            className="p-1.5 sm:p-2 hover:bg-emerald-50 hover:text-emerald-700 rounded-md sm:rounded-lg transition-all duration-200 group"
            title="Next month"
          >
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      {/* Enhanced Monthly Statistics */}
      {monthlyStats.activeDays > 0 && (
        <div className="mb-4 sm:mb-6 lg:mb-8 p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-white to-emerald-50/30 rounded-lg sm:rounded-2xl border border-emerald-200/50 shadow-lg backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg sm:rounded-xl shadow-md">
                <Target className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-gray-800 text-base sm:text-lg">Monthly Overview</h4>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Your progress summary</p>
              </div>
            </div>
            <div className="px-2 sm:px-3 py-1.5 sm:py-2 bg-white rounded-lg sm:rounded-xl border border-emerald-200/50 shadow-sm self-start sm:self-center">
              <div className="text-xs sm:text-sm font-medium text-emerald-700">
                {monthlyStats.activeDays} active day{monthlyStats.activeDays !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
            <div className="group bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-emerald-200/50 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
              <div className="flex items-center justify-between mb-1 sm:mb-2">
                <div className="p-1 sm:p-1.5 bg-emerald-500 rounded-md sm:rounded-lg">
                  <Target className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                </div>
                <div className="text-lg sm:text-xl font-bold text-emerald-700">{Math.round(monthlyStats.completionRate)}%</div>
              </div>
              <div className="text-xs font-medium text-emerald-600">Completion Rate</div>
            </div>
            
            <div className="group bg-gradient-to-br from-green-50 to-green-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-green-200/50 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
              <div className="flex items-center justify-between mb-1 sm:mb-2">
                <div className="p-1 sm:p-1.5 bg-green-500 rounded-md sm:rounded-lg">
                  <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                </div>
                <div className="text-lg sm:text-xl font-bold text-green-700">{monthlyStats.totalCompletions}</div>
              </div>
              <div className="text-xs font-medium text-green-600">Total Completed</div>
            </div>
            
            <div className="group bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-yellow-200/50 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
              <div className="flex items-center justify-between mb-1 sm:mb-2">
                <div className="p-1 sm:p-1.5 bg-yellow-500 rounded-md sm:rounded-lg">
                  <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                </div>
                <div className="text-lg sm:text-xl font-bold text-yellow-700">{monthlyStats.totalPostponed}</div>
              </div>
              <div className="text-xs font-medium text-yellow-600">Total Postponed</div>
            </div>
            
            <div className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
              <div className="flex items-center justify-between mb-1 sm:mb-2">
                <div className="p-1 sm:p-1.5 bg-gray-500 rounded-md sm:rounded-lg">
                  <X className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                </div>
                <div className="text-lg sm:text-xl font-bold text-gray-700">{monthlyStats.totalPossible - monthlyStats.totalCompletions - monthlyStats.totalPostponed}</div>
              </div>
              <div className="text-xs font-medium text-gray-600">Total Missed</div>
            </div>
          </div>
          
          {/* Enhanced Progress Bar */}
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200/50 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 text-xs sm:text-sm text-gray-700 mb-2 sm:mb-3 font-medium">
              <span>Monthly Progress</span>
              <span className="text-xs">{monthlyStats.totalCompletions} of {monthlyStats.totalPossible} habits completed</span>
            </div>
            <div className="relative w-full bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden shadow-inner">
              <div className="h-full flex rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-green-400 to-green-500 transition-all duration-500 ease-out shadow-sm"
                  style={{ width: `${(monthlyStats.totalCompletions / monthlyStats.totalPossible) * 100}%` }}
                ></div>
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-500 ease-out shadow-sm"
                  style={{ width: `${(monthlyStats.totalPostponed / monthlyStats.totalPossible) * 100}%` }}
                ></div>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-yellow-400/20 rounded-full"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1 sm:mt-2">
              <span>0%</span>
              <span className="hidden sm:inline">50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Legend with Animations */}
      <div className="mb-4 sm:mb-6 lg:mb-8 p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-white to-indigo-50/30 rounded-lg sm:rounded-2xl border border-indigo-200/50 shadow-lg backdrop-blur-sm">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="p-1.5 sm:p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg sm:rounded-xl shadow-md">
            <Circle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-gray-800 text-base sm:text-lg">Visual Guide</h4>
            <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Understanding the calendar symbols</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm">
          {/* Completion Rate Section */}
          <div className="bg-white rounded-xl p-4 border border-gray-200/50 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="font-bold text-gray-800">Completion Levels</span>
            </div>
            <div className="space-y-3">
              {[
                { bg: 'bg-gray-100 border-gray-200', icon: '0', text: 'No completion (0%)', color: 'text-gray-600' },
                { bg: 'bg-green-100 border-green-200', icon: '¼', text: 'Low completion (1-49%)', color: 'text-green-600' },
                { bg: 'bg-green-300 border-green-400', icon: '½', text: 'Medium completion (50-74%)', color: 'text-white' },
                { bg: 'bg-green-400 border-green-500', icon: '¾', text: 'High completion (75-99%)', color: 'text-white' },
                { bg: 'bg-green-500 border-green-600 shadow-md', icon: '✓', text: 'Perfect completion (100%)', color: 'text-white' }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-all duration-200">
                  <div className={`w-6 h-6 ${item.bg} border-2 rounded-lg flex items-center justify-center ${item.color} text-xs font-bold shadow-sm group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Status Indicators Section */}
          <div className="bg-white rounded-xl p-4 border border-gray-200/50 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="font-bold text-gray-800">Special Indicators</span>
            </div>
            <div className="space-y-3">
              {[
                { 
                  element: <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded-lg ring-2 ring-yellow-300 flex items-center justify-center"><Clock className="w-3 h-3 text-yellow-600" /></div>,
                  text: 'Has postponed habits'
                },
                { 
                  element: <div className="w-6 h-6 bg-red-100 border-2 border-red-200 rounded-lg flex items-center justify-center"><X className="w-3 h-3 text-red-500" /></div>,
                  text: 'All habits missed'
                },
                { 
                  element: <div className="w-6 h-6 bg-blue-100 border-2 border-blue-300 rounded-lg ring-2 ring-blue-500 flex items-center justify-center"><Target className="w-3 h-3 text-blue-600" /></div>,
                  text: 'Today (interactive)'
                },
                { 
                  element: <div className="w-6 h-6 bg-purple-100 border-2 border-purple-300 rounded-lg ring-2 ring-purple-500 flex items-center justify-center"><Calendar className="w-3 h-3 text-purple-600" /></div>,
                  text: 'Selected date'
                }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-all duration-200">
                  <div className="group-hover:scale-110 transition-transform">
                    {item.element}
                  </div>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Dots Section */}
          <div className="bg-white rounded-xl p-4 border border-gray-200/50 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="font-bold text-gray-800">Progress Dots</span>
            </div>
            <div className="space-y-3">
              <div className="group hover:bg-gray-50 p-2 rounded-lg transition-all duration-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex gap-1 group-hover:scale-110 transition-transform">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-sm"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-sm"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-400 shadow-sm"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  </div>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">Multiple habit status</span>
                </div>
              </div>
              <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Completed habits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <span>Postponed habits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    <span>Incomplete habits</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Calendar Grid */}
      <div className="mb-4 sm:mb-6 bg-white rounded-lg sm:rounded-2xl p-2 sm:p-4 border border-gray-200/50 shadow-sm overflow-x-auto">
        {/* Enhanced Day headers */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 sm:mb-4 min-w-[280px]">
          {dayNames.map((day, index) => (
            <div 
              key={day} 
              className={`text-center text-xs sm:text-sm font-bold py-2 sm:py-3 px-1 sm:px-2 rounded-lg sm:rounded-xl ${
                index === 0 || index === 6 
                  ? 'text-emerald-600 bg-emerald-50 border border-emerald-200' 
                  : 'text-gray-700 bg-gray-50 border border-gray-200'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
        
        {/* Enhanced Calendar days */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 p-1 sm:p-2 bg-gray-50/50 rounded-lg sm:rounded-xl min-w-[280px]">
          {renderCalendarGrid()}
        </div>
      </div>

      {/* Enhanced Selected Date Details */}
      {selectedDetails && (
        <div className="mt-4 sm:mt-6 lg:mt-8 p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-white to-purple-50/30 rounded-lg sm:rounded-2xl border border-purple-200/50 shadow-xl backdrop-blur-sm animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-start sm:items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-start sm:items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="p-1.5 sm:p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg sm:rounded-xl shadow-md flex-shrink-0">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-gray-800 text-sm sm:text-base lg:text-lg">
                  {monthNames[currentMonth]} {selectedDetails.day}, {currentYear}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600">Daily habit breakdown</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedDate(null)}
              className="p-1.5 sm:p-2 hover:bg-red-50 hover:text-red-600 rounded-lg sm:rounded-xl transition-all duration-200 group flex-shrink-0"
              title="Close details"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 group-hover:scale-110 transition-transform" />
            </button>
          </div>
          
          {/* Enhanced Summary Cards */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-1">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-lg font-bold text-green-700">{selectedDetails.completed}</span>
              </div>
              <div className="text-xs text-green-600 font-medium">Completed</div>
              {selectedDetails.total > 0 && (
                <div className="text-xs text-green-500 mt-1">
                  {Math.round((selectedDetails.completed / selectedDetails.total) * 100)}% done
                </div>
              )}
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-3 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between mb-1">
                <Clock className="w-4 h-4 text-yellow-600" />
                <span className="text-lg font-bold text-yellow-700">{selectedDetails.postponed}</span>
              </div>
              <div className="text-xs text-yellow-600 font-medium">Postponed</div>
              {selectedDetails.total > 0 && (
                <div className="text-xs text-yellow-500 mt-1">
                  {Math.round((selectedDetails.postponed / selectedDetails.total) * 100)}% delayed
                </div>
              )}
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-1">
                <Circle className="w-4 h-4 text-gray-500" />
                <span className="text-lg font-bold text-gray-700">{selectedDetails.total - selectedDetails.completed - selectedDetails.postponed}</span>
              </div>
              <div className="text-xs text-gray-600 font-medium">Not Done</div>
              {selectedDetails.total > 0 && (
                <div className="text-xs text-gray-500 mt-1">
                  {Math.round(((selectedDetails.total - selectedDetails.completed - selectedDetails.postponed) / selectedDetails.total) * 100)}% missed
                </div>
              )}
            </div>
          </div>

          {/* Detailed Habit List */}
          {selectedDetails.habits.length > 0 ? (
            <div className="space-y-2">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Habit Details:</h5>
              {selectedDetails.habits.map((habit, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-3">
                    {habit.status === 'completed' ? (
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    ) : habit.status === 'postponed' ? (
                      <Clock className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    )}
                    <span className="text-sm text-gray-700 font-medium">{habit.name}</span>
                  </div>
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1
                    ${habit.status === 'completed' ? 'bg-green-100 text-green-700 border border-green-200' :
                      habit.status === 'postponed' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                      'bg-gray-100 text-gray-600 border border-gray-200'}
                  `}>
                    {habit.status === 'completed' ? (
                      <>
                        <Check className="w-3 h-3" />
                        Completed
                      </>
                    ) : habit.status === 'postponed' ? (
                      <>
                        <Clock className="w-3 h-3" />
                        Postponed
                      </>
                    ) : (
                      <>
                        <Circle className="w-3 h-3" />
                        Not Done
                      </>
                    )}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500 text-sm">
              No habits were tracked on this day
            </div>
          )}
        </div>
      )}
    </div>
  );
};
