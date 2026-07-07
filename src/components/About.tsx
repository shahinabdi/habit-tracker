import React from 'react';
import { Github, Linkedin, Mail, Coffee, Heart, Shield, Code } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-surface rounded-2xl border border-edge p-4 sm:p-6">
      {/* Developer */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 bg-accent-soft rounded-full flex items-center justify-center flex-shrink-0">
          <Code className="w-5 h-5 text-accent" />
        </div>
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-ink">Shahin ABDI</h3>
          <p className="text-sm text-soft">Full Stack Developer</p>
        </div>
      </div>

      <p className="text-soft text-sm mb-5 leading-relaxed">
        Passionate about creating tools that empower personal growth — building
        applications that make complex tasks simple and enjoyable.
      </p>

      <div className="flex flex-wrap gap-2 mb-5">
        <a
          href="https://github.com/shahinabdi"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2 bg-inset text-ink rounded-xl hover:bg-edge-strong/60 transition-colors text-sm font-medium"
        >
          <Github className="w-4 h-4" />
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/shahinabdi"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2 bg-inset text-ink rounded-xl hover:bg-edge-strong/60 transition-colors text-sm font-medium"
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </a>
        <a
          href="mailto:fxappfeedback@proton.me"
          className="flex items-center gap-2 px-3.5 py-2 bg-inset text-ink rounded-xl hover:bg-edge-strong/60 transition-colors text-sm font-medium"
        >
          <Mail className="w-4 h-4" />
          Email
        </a>
        <a
          href="https://buymeacoffee.com/shahinabdi"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2 bg-status-partial-soft text-status-partial rounded-xl hover:bg-status-partial/20 transition-colors text-sm font-medium"
        >
          <Coffee className="w-4 h-4" />
          Buy me a coffee
        </a>
      </div>

      {/* Privacy */}
      <div className="flex items-start gap-3 p-4 bg-inset rounded-xl mb-5">
        <Shield className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
        <p className="text-sm text-soft leading-relaxed">
          Your habits are stored securely in your private account and synced across
          devices. No tracking, no ads, no data sharing.
        </p>
      </div>

      <div className="flex items-center justify-between text-xs text-faint">
        <span className="flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-status-missed" />
          Made with love · MIT License
        </span>
        <span>v1.0.0</span>
      </div>
    </div>
  );
};
