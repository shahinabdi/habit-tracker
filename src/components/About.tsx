import React from 'react';
import { Github, Linkedin, Mail, Coffee, Star, Heart, Shield, Code, Users } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Developer Info */}
      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border border-emerald-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full flex items-center justify-center">
            <Code className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Shahin ABDI</h3>
            <p className="text-sm text-gray-600">Full Stack Developer & Trading Enthusiast</p>
          </div>
        </div>

        <p className="text-gray-700 mb-4">
          Passionate about creating tools that empower personal growth and financial literacy. 
          Building applications that make complex tasks simple and enjoyable.
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <a
            href="https://github.com/shahinabdi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/shahinabdi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
          <a
            href="mailto:fxappfeedback@proton.me"
            className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
          >
            <Mail className="w-4 h-4" />
            Email
          </a>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Heart className="w-4 h-4 text-red-500" />
          <span>"Technology should serve humanity by making our lives better, more organized, and more fulfilling."</span>
        </div>
      </div>

      {/* Support Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Coffee className="w-5 h-5 text-yellow-600" />
          <h3 className="text-lg font-semibold text-gray-800">Support Development</h3>
        </div>

        <p className="text-gray-600 mb-4">
          Your support helps maintain and improve this free, open-source project. Every contribution makes a difference!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-2 mb-2">
              <Coffee className="w-4 h-4 text-yellow-600" />
              <span className="font-medium text-gray-800">Buy Me a Coffee</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">Direct financial support for development</p>
            <a
              href="https://buymeacoffee.com/shahinabdi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors font-medium text-sm"
            >
              <Coffee className="w-4 h-4" />
              Support Now
            </a>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-gray-600" />
              <span className="font-medium text-gray-800">Star on GitHub</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">Show appreciation and boost visibility</p>
            <a
              href="https://github.com/shahinabdi/habit-tracker"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm"
            >
              <Github className="w-4 h-4" />
              Star Project
            </a>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-800 mb-2">How Your Support Helps:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Faster development of new features</li>
            <li>• Quicker bug fixes and improvements</li>
            <li>• Better documentation and tutorials</li>
            <li>• Platform expansion (mobile apps, desktop)</li>
          </ul>
        </div>
      </div>

      {/* Project Mission */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-emerald-600" />
          <h3 className="text-lg font-semibold text-gray-800">Project Mission</h3>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Core Values</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-800">Privacy First</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Community Driven</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                <Heart className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Accessibility</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-2">Privacy Promise</h4>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm text-green-800">
                🔒 Your data stays on your device - no servers, no tracking, no data collection. 
                This app works entirely offline and respects your privacy completely.
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-2">Technology Stack</h4>
            <div className="flex flex-wrap gap-2">
              {[
                'React 18.3.1',
                'TypeScript 5.5.3',
                'Tailwind CSS 3.4.1',
                'Vite 5.4.2',
                'Local Storage API'
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Version Info */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Version Information</h3>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Version:</span>
            <span className="font-mono">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">License:</span>
            <span>MIT</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Build:</span>
            <span className="font-mono">2024.09.08</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Platform:</span>
            <span>Web</span>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            © 2024 Shahin ABDI. Licensed under MIT. Made with ❤️ for the community.
          </p>
        </div>
      </div>
    </div>
  );
};
