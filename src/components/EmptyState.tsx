import React from 'react';
import { Download, Plus, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  onLoadSampleData: () => void;
  onSwitchToSettings: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onLoadSampleData, onSwitchToSettings }) => {
  return (
    <div className="bg-surface rounded-2xl border border-edge p-8 sm:p-10 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-14 h-14 bg-accent-soft rounded-full flex items-center justify-center mx-auto mb-5">
          <Sparkles className="w-6 h-6 text-accent" />
        </div>

        <h3 className="text-lg font-semibold text-ink mb-2">
          Start your first habit
        </h3>

        <p className="text-soft text-sm mb-6 leading-relaxed">
          Add your first habit and it'll show up in your daily calendar, ready to track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onLoadSampleData}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-accent text-white rounded-xl hover:bg-accent-hover transition-colors font-medium text-sm"
          >
            <Download className="w-4 h-4" />
            Try sample habits
          </button>

          <div className="flex items-center justify-center gap-2 px-5 py-2.5 text-soft text-sm">
            <Plus className="w-4 h-4" />
            Or add your own anytime
          </div>
        </div>

        <button
          onClick={onSwitchToSettings}
          className="mt-6 text-sm text-faint hover:text-accent font-medium transition-colors"
        >
          Explore more options in Settings →
        </button>
      </div>
    </div>
  );
};
