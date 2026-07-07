import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import { HabitData, Habit } from '../types';
import { findSimilarHabit } from '../utils/habitValidation';

const LOCAL_STORAGE_KEY = 'habitTracker';

interface HabitRow {
  id: number;
  name: string;
  completed_dates: string[];
  postponed_dates: string[];
}

const rowToHabit = (row: HabitRow): Habit => ({
  id: row.id,
  name: row.name,
  completedDates: row.completed_dates,
  postponedDates: row.postponed_dates,
});

interface HabitsContextValue {
  habitData: HabitData;
  loading: boolean;
  addHabit: (name: string) => Promise<{ success: boolean; similarHabit?: string }>;
  deleteHabit: (habitId: number) => Promise<void>;
  toggleHabit: (habitId: number, date: string, action: 'complete' | 'postpone' | 'clear') => Promise<void>;
  importHabits: (data: HabitData) => Promise<void>;
  loadSampleData: (data: HabitData) => Promise<void>;
  clearData: () => Promise<void>;
}

const HabitsContext = createContext<HabitsContextValue | undefined>(undefined);

export const HabitsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('habits')
      .select('id, name, completed_dates, postponed_dates')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error) {
      showToast('error', 'Failed to load your habits. Please refresh and try again.');
      return [];
    }
    return (data as HabitRow[]).map(rowToHabit);
  }, [showToast]);

  useEffect(() => {
    if (!user) {
      setHabits([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    (async () => {
      setLoading(true);
      let loaded = await reload(user.id);

      // One-time migration: carry over pre-auth localStorage data if the DB is empty.
      if (loaded.length === 0) {
        const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
        if (raw) {
          try {
            const legacy = JSON.parse(raw) as HabitData;
            if (legacy.habits?.length) {
              const rows = legacy.habits.map(h => ({
                user_id: user.id,
                name: h.name,
                completed_dates: h.completedDates,
                postponed_dates: h.postponedDates,
              }));
              const { error } = await supabase.from('habits').insert(rows);
              if (!error) {
                loaded = await reload(user.id);
                window.localStorage.removeItem(LOCAL_STORAGE_KEY);
              }
            }
          } catch {
            // Ignore unparsable legacy data.
          }
        }
      }

      if (!cancelled) {
        setHabits(loaded);
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, reload]);

  const addHabit = async (name: string): Promise<{ success: boolean; similarHabit?: string }> => {
    if (!user) return { success: false };

    const trimmedName = name.trim();
    const similarHabit = findSimilarHabit(trimmedName, habits);
    if (similarHabit) return { success: false, similarHabit };

    const { data, error } = await supabase
      .from('habits')
      .insert({ user_id: user.id, name: trimmedName, completed_dates: [], postponed_dates: [] })
      .select('id, name, completed_dates, postponed_dates')
      .single();

    if (error || !data) {
      showToast('error', 'Failed to add habit. Please try again.');
      return { success: false };
    }

    setHabits(prev => [...prev, rowToHabit(data as HabitRow)]);
    return { success: true };
  };

  const deleteHabit = async (habitId: number) => {
    const previous = habits;
    setHabits(prev => prev.filter(h => h.id !== habitId));

    const { error } = await supabase.from('habits').delete().eq('id', habitId);
    if (error) {
      showToast('error', 'Failed to delete habit. Please try again.');
      setHabits(previous);
    }
  };

  const toggleHabit = async (habitId: number, date: string, action: 'complete' | 'postpone' | 'clear') => {
    const target = habits.find(h => h.id === habitId);
    if (!target) return;

    const completedDates = target.completedDates.filter(d => d !== date);
    const postponedDates = target.postponedDates.filter(d => d !== date);
    if (action === 'complete') completedDates.push(date);
    if (action === 'postpone') postponedDates.push(date);

    const previous = habits;
    setHabits(prev =>
      prev.map(h => (h.id === habitId ? { ...h, completedDates, postponedDates } : h))
    );

    const { error } = await supabase
      .from('habits')
      .update({ completed_dates: completedDates, postponed_dates: postponedDates })
      .eq('id', habitId);

    if (error) {
      showToast('error', 'Failed to save your update. Please try again.');
      setHabits(previous);
    }
  };

  const replaceAllHabits = async (data: HabitData) => {
    if (!user) return;

    await supabase.from('habits').delete().eq('user_id', user.id);

    if (data.habits.length > 0) {
      const rows = data.habits.map(h => ({
        user_id: user.id,
        name: h.name,
        completed_dates: h.completedDates,
        postponed_dates: h.postponedDates,
      }));
      const { error } = await supabase.from('habits').insert(rows);
      if (error) {
        showToast('error', 'Failed to save imported habits. Please try again.');
      }
    }

    setHabits(await reload(user.id));
  };

  const clearData = async () => {
    if (!user) return;
    const { error } = await supabase.from('habits').delete().eq('user_id', user.id);
    if (error) {
      showToast('error', 'Failed to clear data. Please try again.');
      return;
    }
    setHabits([]);
  };

  return (
    <HabitsContext.Provider
      value={{
        habitData: { habits },
        loading,
        addHabit,
        deleteHabit,
        toggleHabit,
        importHabits: replaceAllHabits,
        loadSampleData: replaceAllHabits,
        clearData,
      }}
    >
      {children}
    </HabitsContext.Provider>
  );
};

export const useHabitsContext = (): HabitsContextValue => {
  const ctx = useContext(HabitsContext);
  if (!ctx) throw new Error('useHabits must be used within a HabitsProvider');
  return ctx;
};
