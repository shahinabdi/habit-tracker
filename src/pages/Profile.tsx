import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Mail, Calendar, BadgeCheck, Target, CheckCircle2, Flame, Pencil, Check, X, Moon, Sun } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useHabits } from '../hooks/useHabits';
import { useToast } from '../contexts/ToastContext';
import { getBestCurrentStreak } from '../utils/habitStats';
import { getDisplayName } from '../utils/user';

export const Profile: React.FC = () => {
  const { user, signOut, updateProfile } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { habitData, loading } = useHabits();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [savingName, setSavingName] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/login', { replace: true });
  };

  const startEditingName = () => {
    setNameInput(getDisplayName(user));
    setEditingName(true);
  };

  const handleSaveName = async () => {
    const trimmed = nameInput.trim();
    if (!trimmed) return;

    setSavingName(true);
    const { error } = await updateProfile(trimmed);
    setSavingName(false);

    if (error) {
      showToast('error', 'Failed to update your name. Please try again.');
      return;
    }
    showToast('success', 'Name updated.');
    setEditingName(false);
  };

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    : '—';

  const totalHabits = habitData.habits.length;
  const totalCompletions = habitData.habits.reduce((sum, h) => sum + h.completedDates.length, 0);
  const bestStreak = getBestCurrentStreak(habitData.habits);

  const stats = [
    { icon: Target, value: totalHabits, label: 'Habits' },
    { icon: CheckCircle2, value: totalCompletions, label: 'Completions' },
    { icon: Flame, value: bestStreak, label: 'Best streak' },
  ];

  return (
    <div className="py-2">
      <div className="max-w-sm mx-auto">
        <div className="bg-surface rounded-2xl border border-edge p-6 sm:p-8">
          <div className="w-16 h-16 bg-accent-soft rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-semibold text-accent">
              {getDisplayName(user)[0]?.toUpperCase() ?? '?'}
            </span>
          </div>

          {editingName ? (
            <div className="flex items-center justify-center gap-2 mb-1">
              <input
                autoFocus
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSaveName()}
                maxLength={50}
                className="text-center text-lg font-semibold text-ink border border-edge-strong rounded-lg px-2 py-1 w-40 focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors"
              />
              <button
                onClick={handleSaveName}
                disabled={savingName}
                className="p-1.5 rounded-lg text-accent hover:bg-accent-soft transition-colors disabled:opacity-50"
                aria-label="Save name"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => setEditingName(false)}
                className="p-1.5 rounded-lg text-faint hover:bg-inset transition-colors"
                aria-label="Cancel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={startEditingName}
              className="group flex items-center justify-center gap-1.5 mx-auto mb-1"
            >
              <h2 className="text-lg font-semibold text-ink">{getDisplayName(user)}</h2>
              <Pencil className="w-3.5 h-3.5 text-faint group-hover:text-soft transition-colors" />
            </button>
          )}

          {user?.email_confirmed_at && (
            <p className="flex items-center justify-center gap-1 text-xs text-accent mt-1 mb-6">
              <BadgeCheck className="w-3.5 h-3.5" />
              Verified account
            </p>
          )}
          {!user?.email_confirmed_at && <div className="mb-6" />}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center p-3 bg-inset rounded-xl">
                <Icon className="w-4 h-4 text-faint mx-auto mb-1.5" />
                <div className="text-lg font-bold text-ink">{loading ? '—' : value}</div>
                <div className="text-xs text-soft font-medium">{label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 p-3 bg-inset rounded-xl">
              <Mail className="w-4 h-4 text-faint flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-xs text-soft">Email</div>
                <div className="text-sm font-medium text-ink truncate">{user?.email}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-inset rounded-xl">
              <Calendar className="w-4 h-4 text-faint flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-xs text-soft">Member since</div>
                <div className="text-sm font-medium text-ink">{memberSince}</div>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 p-3 bg-inset rounded-xl hover:bg-edge-strong/60 transition-colors text-left"
            >
              {theme === 'dark' ? (
                <Moon className="w-4 h-4 text-faint flex-shrink-0" />
              ) : (
                <Sun className="w-4 h-4 text-faint flex-shrink-0" />
              )}
              <div className="min-w-0 flex-1">
                <div className="text-xs text-soft">Appearance</div>
                <div className="text-sm font-medium text-ink">
                  {theme === 'dark' ? 'Dark mode' : 'Light mode'}
                </div>
              </div>
              <span className="text-xs text-faint">Tap to switch</span>
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-status-missed-soft text-status-missed rounded-xl hover:bg-status-missed/20 transition-colors font-medium text-sm"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};
