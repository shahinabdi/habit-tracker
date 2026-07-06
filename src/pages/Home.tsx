import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { Header } from '../components/Header';
import { HabitInput } from '../components/HabitInput';
import { CalendarView } from '../components/calendar/CalendarView';
import { EmptyState } from '../components/EmptyState';
import { Stats } from '../components/Stats';
import { ExportImport } from '../components/ExportImport';
import { DataManagement } from '../components/DataManagement';
import { About } from '../components/About';
import { Footer } from '../components/Footer';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { HabitData, Habit } from '../types';
import { generateSampleData } from '../utils/sampleData';
import { findSimilarHabit } from '../utils/habitValidation';
import { getTodayString } from '../utils/dateUtils';
import { Calendar, BarChart3, Settings } from 'lucide-react';

export const Home: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(getTodayString());

  const [activeTab, setActiveTab] = useState<'calendar' | 'stats' | 'settings'>('calendar');

  const [habitData, setHabitData] = useLocalStorage<HabitData>('habitTracker', {
    habits: []
  });

  const addHabit = (name: string): { success: boolean; similarHabit?: string } => {
    // Check for duplicates and similar habits
    const trimmedName = name.trim();
    const similarHabit = findSimilarHabit(trimmedName, habitData.habits);

    if (similarHabit) {
      return { success: false, similarHabit }; // Return the similar habit name
    }

    const newHabit: Habit = {
      id: Date.now(),
      name: trimmedName,
      completedDates: [],
      postponedDates: []
    };

    setHabitData(prev => ({
      ...prev,
      habits: [...prev.habits, newHabit]
    }));

    return { success: true }; // Return success
  };

  const deleteHabit = (habitId: number) => {
    setHabitData(prev => ({
      ...prev,
      habits: prev.habits.filter(habit => habit.id !== habitId)
    }));
  };

  const handleToggleHabit = (habitId: number, date: string, action: 'complete' | 'postpone' | 'clear') => {
    setHabitData(prevData => ({
      ...prevData,
      habits: prevData.habits.map(habit => {
        if (habit.id !== habitId) return habit;

        const updatedHabit = { ...habit };

        // Remove from both arrays first
        updatedHabit.completedDates = habit.completedDates.filter(d => d !== date);
        updatedHabit.postponedDates = habit.postponedDates.filter(d => d !== date);

        // Add to appropriate array based on action
        if (action === 'complete') {
          updatedHabit.completedDates.push(date);
        } else if (action === 'postpone') {
          updatedHabit.postponedDates.push(date);
        }
        // 'clear' action leaves it in neither array

        return updatedHabit;
      })
    }));
  };

  const handleImport = (importedData: HabitData) => {
    setHabitData(importedData);
  };

  const handleLoadSampleData = (sampleData: HabitData) => {
    setHabitData(sampleData);
  };

  const handleQuickSampleLoad = () => {
    const sampleData = generateSampleData();
    setHabitData(sampleData);
  };

  const handleClearData = () => {
    setHabitData({ habits: [] });
  };

  const tabs = [
    { id: 'calendar' as const, label: 'Calendar', icon: Calendar },
    { id: 'stats' as const, label: 'Statistics', icon: BarChart3 },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex justify-end mb-2">
          <Link
            to="/profile"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-500 hover:text-gray-800 hover:bg-white transition-colors"
          >
            <User className="w-4 h-4" />
            Profile
          </Link>
        </div>

        <Header />

        {/* Tab Navigation */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-white rounded-xl shadow-sm border border-gray-100 p-1 gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
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
        {activeTab === 'calendar' && (
          <div>
            <HabitInput onAddHabit={addHabit} />
            {habitData.habits.length === 0 ? (
              <EmptyState
                onLoadSampleData={handleQuickSampleLoad}
                onSwitchToSettings={() => setActiveTab('settings')}
              />
            ) : (
              <CalendarView
                habits={habitData.habits}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                onToggleHabit={handleToggleHabit}
                onDeleteHabit={deleteHabit}
              />
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <Stats habitData={habitData} selectedDate={selectedDate} />
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <DataManagement
              habitData={habitData}
              onLoadSampleData={handleLoadSampleData}
              onClearData={handleClearData}
            />
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
};
