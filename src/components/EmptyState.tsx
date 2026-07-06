import React from 'react';
import { Download, Plus, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  onLoadSampleData: () => void;
  onSwitchToSettings: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onLoadSampleData, onSwitchToSettings }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 sm:p-10 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <Sparkles className="w-6 h-6 text-emerald-500" />
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Start your first habit
        </h3>

        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          Add a habit above and it'll show up in your daily calendar, ready to track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onLoadSampleData}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium text-sm"
          >
            <Download className="w-4 h-4" />
            Try sample habits
          </button>

          <div className="flex items-center justify-center gap-2 px-5 py-2.5 text-gray-400 text-sm">
            <Plus className="w-4 h-4" />
            Or add your own above
          </div>
        </div>

        <button
          onClick={onSwitchToSettings}
          className="mt-6 text-sm text-gray-400 hover:text-emerald-600 font-medium transition-colors"
        >
          Explore more options in Settings →
        </button>
      </div>
    </div>
  );
};
