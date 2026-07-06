import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { Header } from '../components/Header';
import { WelcomeBanner } from '../components/WelcomeBanner';
import { HabitInput } from '../components/HabitInput';
import { CalendarView } from '../components/calendar/CalendarView';
import { EmptyState } from '../components/EmptyState';
import { Stats } from '../components/Stats';
import { ExportImport } from '../components/ExportImport';
import { DataManagement } from '../components/DataManagement';
import { About } from '../components/About';
import { Footer } from '../components/Footer';
import { useHabits } from '../hooks/useHabits';
import { generateSampleData } from '../utils/sampleData';
import { getTodayString } from '../utils/dateUtils';
import { Calendar, BarChart3, Settings } from 'lucide-react';

export const Home: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(getTodayString());
  const [activeTab, setActiveTab] = useState<'calendar' | 'stats' | 'settings'>('calendar');

  const {
    habitData,
    loading,
    addHabit,
    deleteHabit,
    toggleHabit,
    importHabits,
    loadSampleData,
    clearData,
  } = useHabits();

  const handleQuickSampleLoad = () => {
    loadSampleData(generateSampleData());
  };

  const tabs = [
    { id: 'calendar' as const, label: 'Calendar', icon: Calendar },
    { id: 'stats' as const, label: 'Statistics', icon: BarChart3 },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

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
        <WelcomeBanner />

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
                onToggleHabit={toggleHabit}
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
              onLoadSampleData={loadSampleData}
              onClearData={clearData}
            />
            <ExportImport
              habitData={habitData}
              onImport={importHabits}
            />
            <About />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
