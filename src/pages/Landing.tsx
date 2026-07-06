import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, TrendingUp, Cloud, Sparkles } from 'lucide-react';
import { Footer } from '../components/Footer';

const features = [
  {
    icon: CalendarDays,
    title: 'Day, week & month views',
    description: 'A clean, minimal calendar that shows exactly what needs doing today, this week, and this month.',
  },
  {
    icon: TrendingUp,
    title: 'Track your progress',
    description: 'Streaks and soft visual indicators show your momentum at a glance, without the clutter.',
  },
  {
    icon: Cloud,
    title: 'Synced to your account',
    description: 'Your habits are saved to your account, so your progress follows you across devices.',
  },
  {
    icon: Sparkles,
    title: 'Simple by design',
    description: 'No noisy dashboards or gimmicks. Just a calm, modern way to build habits that stick.',
  },
];

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Nav */}
        <nav className="flex items-center justify-between py-6">
          <span className="text-lg font-bold text-gray-900 tracking-tight">Habit Tracker</span>
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors text-sm font-medium"
            >
              Sign up
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <div className="text-center py-14 sm:py-20">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Build habits that
            <br />
            actually stick.
          </h1>
          <p className="text-gray-500 text-base sm:text-lg mt-5 max-w-md mx-auto">
            A calm, modern habit tracker with daily, weekly, and monthly views — so you always know what matters today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <Link
              to="/register"
              className="w-full sm:w-auto px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium text-sm"
            >
              Get started — it's free
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors font-medium text-sm"
            >
              Log in
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-16 sm:pb-24">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
              <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center mb-3">
                <Icon className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};
