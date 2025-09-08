import React from 'react';
import { Heart, Coffee, Github, Star, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">About Habit Tracker</h3>
            <p className="text-gray-600 text-sm mb-4">
              A privacy-first habit tracking application designed to help you build lasting positive habits 
              and achieve your personal growth goals.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Heart className="w-4 h-4 text-red-500" />
              <span>Made with love by Shahin ABDI</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/shahinabdi/habit-tracker"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-emerald-600 text-sm flex items-center gap-1"
                >
                  <Github className="w-3 h-3" />
                  Source Code
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/shahinabdi/habit-tracker/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-emerald-600 text-sm flex items-center gap-1"
                >
                  Report Issues
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/shahinabdi/habit-tracker/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-emerald-600 text-sm flex items-center gap-1"
                >
                  Community
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:fxappfeedback@proton.me"
                  className="text-gray-600 hover:text-emerald-600 text-sm"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Support Development</h3>
            <p className="text-gray-600 text-sm mb-4">
              Help keep this project free and actively maintained!
            </p>
            <div className="space-y-2">
              <a
                href="https://buymeacoffee.com/shahinabdi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors text-sm font-medium"
              >
                <Coffee className="w-4 h-4" />
                Buy me a coffee
              </a>
              <br />
              <a
                href="https://github.com/shahinabdi/habit-tracker"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm"
              >
                <Star className="w-4 h-4" />
                Star on GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Built with modern technologies:</h4>
          <div className="flex flex-wrap gap-2">
            {[
              'React 18.3.1',
              'TypeScript 5.5.3',
              'Tailwind CSS 3.4.1',
              'Vite 5.4.2',
              'Lucide Icons'
            ].map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              © 2024 <a 
                href="https://github.com/shahinabdi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-emerald-600"
              >
                Shahin ABDI
              </a>. Licensed under MIT.
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-400">Version 1.0.0</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-500">Privacy-First</span>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full mt-0.5 flex-shrink-0"></div>
            <div>
              <h5 className="text-sm font-medium text-green-800">Privacy Guarantee</h5>
              <p className="text-xs text-green-700 mt-1">
                Your habit data is stored locally on your device. No servers, no tracking, no data collection. 
                Your privacy is completely protected.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
