import { useState } from 'react';
import { Header } from './components/Header';
import { HabitInput } from './components/HabitInput';
import { HabitGrid } from './components/HabitGrid';
import { Stats } from './components/Stats';
import { ExportImport } from './components/ExportImport';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { useLocalStorage } from './hooks/useLocalStorage';
import { HabitData, Habit } from './types';
import { Calendar, BarChart3, Settings } from 'lucide-react';

function App() {
  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date();
    return { month: now.getMonth(), year: now.getFullYear() };
  });

  const [activeTab, setActiveTab] = useState<'habits' | 'stats' | 'settings'>('habits');

  const [habitData, setHabitData] = useLocalStorage<HabitData>('habitTracker', {
    habits: []
  });

  const addHabit = (name: string) => {
    const newHabit: Habit = {
      id: Date.now(),
      name,
      completedDates: []
    };

    setHabitData(prev => ({
      ...prev,
      habits: [...prev.habits, newHabit]
    }));
  };

  const deleteHabit = (habitId: number) => {
    setHabitData(prev => ({
      ...prev,
      habits: prev.habits.filter(habit => habit.id !== habitId)
    }));
  };

  const toggleHabit = (habitId: number, date: string) => {
    setHabitData(prev => ({
      ...prev,
      habits: prev.habits.map(habit => {
        if (habit.id === habitId) {
          const isCompleted = habit.completedDates.includes(date);
          return {
            ...habit,
            completedDates: isCompleted
              ? habit.completedDates.filter(d => d !== date)
              : [...habit.completedDates, date].sort()
          };
        }
        return habit;
      })
    }));
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      if (direction === 'prev') {
        return prev.month === 0
          ? { month: 11, year: prev.year - 1 }
          : { month: prev.month - 1, year: prev.year };
      } else {
        return prev.month === 11
          ? { month: 0, year: prev.year + 1 }
          : { month: prev.month + 1, year: prev.year };
      }
    });
  };

  const handleImport = (importedData: HabitData) => {
    setHabitData(importedData);
  };

  const tabs = [
    { id: 'habits' as const, label: 'Habits', icon: Calendar },
    { id: 'stats' as const, label: 'Statistics', icon: BarChart3 },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <Header
          currentMonth={currentDate.month}
          currentYear={currentDate.year}
          onPreviousMonth={() => navigateMonth('prev')}
          onNextMonth={() => navigateMonth('next')}
        />
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                    activeTab === tab.id
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'habits' && (
          <div>
            <HabitInput onAddHabit={addHabit} />
            <HabitGrid
              habits={habitData.habits}
              currentMonth={currentDate.month}
              currentYear={currentDate.year}
              onToggleHabit={toggleHabit}
              onDeleteHabit={deleteHabit}
            />
          </div>
        )}

        {activeTab === 'stats' && (
          <Stats
            habitData={habitData}
            currentMonth={currentDate.month}
            currentYear={currentDate.year}
          />
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <ExportImport
              habitData={habitData}
              onImport={handleImport}
            />
            <About />
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default App;