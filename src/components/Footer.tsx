import React from 'react';
import { Heart, Coffee, Github, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-10 border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">About Habit Tracker</h3>
            <p className="text-gray-500 text-sm mb-3 leading-relaxed">
              A privacy-first habit tracking app that helps you build lasting positive habits.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              <span>Made by Shahin ABDI</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/shahinabdi/habit-tracker"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-emerald-600 text-sm flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  Source Code
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/shahinabdi/habit-tracker/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-emerald-600 text-sm flex items-center gap-1.5"
                >
                  Report Issues
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:fxappfeedback@proton.me"
                  className="text-gray-500 hover:text-emerald-600 text-sm"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Support Development</h3>
            <p className="text-gray-500 text-sm mb-3">
              Help keep this project free and maintained.
            </p>
            <a
              href="https://buymeacoffee.com/shahinabdi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-amber-50 text-amber-700 rounded-xl hover:bg-amber-100 transition-colors text-sm font-medium"
            >
              <Coffee className="w-4 h-4" />
              Buy me a coffee
            </a>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-400">
          <span>
            © 2024{' '}
            <a
              href="https://github.com/shahinabdi"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-600"
            >
              Shahin ABDI
            </a>
            . Licensed under MIT.
          </span>
          <span>Version 1.0.0 · Privacy-first, local storage only</span>
        </div>
      </div>
    </footer>
  );
};
