import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut, Mail, Calendar, BadgeCheck, Target, CheckCircle2, Flame } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useHabits } from '../hooks/useHabits';
import { getBestCurrentStreak } from '../utils/habitStats';

export const Profile: React.FC = () => {
  const { user, signOut } = useAuth();
  const { habitData, loading } = useHabits();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login', { replace: true });
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
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:py-10">
      <div className="max-w-sm mx-auto">
        <Link
          to="/home"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-semibold text-emerald-600">
              {user?.email?.[0]?.toUpperCase() ?? '?'}
            </span>
          </div>

          <h2 className="text-lg font-semibold text-gray-800 text-center">
            {user?.email?.split('@')[0]}
          </h2>
          {user?.email_confirmed_at && (
            <p className="flex items-center justify-center gap-1 text-xs text-emerald-600 mt-1 mb-6">
              <BadgeCheck className="w-3.5 h-3.5" />
              Verified account
            </p>
          )}
          {!user?.email_confirmed_at && <div className="mb-6" />}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center p-3 bg-gray-50 rounded-xl">
                <Icon className="w-4 h-4 text-gray-400 mx-auto mb-1.5" />
                <div className="text-lg font-bold text-gray-800">{loading ? '—' : value}</div>
                <div className="text-xs text-gray-500 font-medium">{label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-xs text-gray-400">Email</div>
                <div className="text-sm font-medium text-gray-800 truncate">{user?.email}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-xs text-gray-400">Member since</div>
                <div className="text-sm font-medium text-gray-800">{memberSince}</div>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-status-missed-soft text-rose-700 rounded-xl hover:bg-rose-100 transition-colors font-medium text-sm"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};
