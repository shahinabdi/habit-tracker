import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Calendar, BarChart3, Settings, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getDisplayName } from '../utils/user';

const navItems = [
  { to: '/home', label: 'Home', icon: Calendar },
  { to: '/stats', label: 'Stats', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/profile', label: 'Profile', icon: User },
];

export const AppShell: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop top bar */}
      <header className="hidden sm:block sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-8 h-16 flex items-center justify-between">
          <NavLink to="/home" className="text-lg font-bold text-gray-900 tracking-tight">
            Habit Tracker
          </NavLink>

          <nav className="flex items-center gap-1">
            {navItems.slice(0, 3).map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center gap-2 ml-3 pl-1.5 pr-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  isActive
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <span className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-semibold">
                {getDisplayName(user)[0]?.toUpperCase() ?? '?'}
              </span>
              <span className="max-w-[120px] truncate">{getDisplayName(user)}</span>
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Page content; bottom padding on mobile clears the fixed nav bar */}
      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-4 sm:py-8 pb-28 sm:pb-12">
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      <nav className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-100 pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-4">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 py-2.5 min-h-[56px] transition-colors ${
                  isActive ? 'text-emerald-600' : 'text-gray-400 active:text-gray-600'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="w-5 h-5" strokeWidth={isActive ? 2.4 : 2} />
                  <span className={`text-[11px] leading-none ${isActive ? 'font-semibold' : 'font-medium'}`}>
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};
