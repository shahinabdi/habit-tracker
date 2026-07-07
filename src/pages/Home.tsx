import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { WelcomeBanner } from '../components/WelcomeBanner';
import { HabitInput } from '../components/HabitInput';
import { AddHabitSheet } from '../components/AddHabitSheet';
import { CalendarView } from '../components/calendar/CalendarView';
import { EmptyState } from '../components/EmptyState';
import { useHabits } from '../hooks/useHabits';
import { generateSampleData } from '../utils/sampleData';
import { getTodayString } from '../utils/dateUtils';

export const Home: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(getTodayString());
  const [sheetOpen, setSheetOpen] = useState(false);
  const navigate = useNavigate();

  const { habitData, loading, addHabit, deleteHabit, toggleHabit, loadSampleData } = useHabits();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <WelcomeBanner />

      {/* Desktop: inline add form. Mobile uses the FAB + bottom sheet instead. */}
      <div className="hidden sm:block">
        <HabitInput onAddHabit={addHabit} />
      </div>

      {habitData.habits.length === 0 ? (
        <EmptyState
          onLoadSampleData={() => loadSampleData(generateSampleData())}
          onSwitchToSettings={() => navigate('/settings')}
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

      {/* Mobile FAB */}
      <button
        onClick={() => setSheetOpen(true)}
        className="sm:hidden fixed z-40 right-4 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] w-14 h-14 bg-emerald-600 text-white rounded-full shadow-lg shadow-emerald-600/30 flex items-center justify-center active:scale-95 transition-transform"
        aria-label="Add a habit"
      >
        <Plus className="w-6 h-6" />
      </button>

      <AddHabitSheet open={sheetOpen} onClose={() => setSheetOpen(false)} onAddHabit={addHabit} />
    </div>
  );
};
