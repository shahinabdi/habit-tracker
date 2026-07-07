import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Calendar, BarChart3, Settings, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getDisplayName } from '../utils/user';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { to: '/home', label: 'Home', icon: Calendar },
  { to: '/stats', label: 'Stats', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/profile', label: 'Profile', icon: User },
];

export const AppShell: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-canvas">
      {/* Desktop top bar */}
      <header className="hidden sm:block sticky top-0 z-40 bg-surface/90 backdrop-blur border-b border-edge">
        <div className="max-w-4xl mx-auto px-8 h-16 flex items-center justify-between">
          <NavLink to="/home" className="text-lg font-bold text-ink tracking-tight">
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
                      ? 'bg-accent-soft text-accent'
                      : 'text-soft hover:text-ink hover:bg-inset'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}

            <ThemeToggle className="ml-1" />

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center gap-2 ml-2 pl-1.5 pr-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  isActive
                    ? 'border-accent/30 bg-accent-soft text-accent'
                    : 'border-edge-strong text-soft hover:bg-inset'
                }`
              }
            >
              <span className="w-7 h-7 bg-accent-soft text-accent rounded-full flex items-center justify-center text-xs font-semibold">
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
      <nav className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-surface border-t border-edge pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-4">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 py-2.5 min-h-[56px] transition-colors ${
                  isActive ? 'text-accent' : 'text-faint active:text-soft'
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
