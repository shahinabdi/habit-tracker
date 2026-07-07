import React, { useState } from 'react';
import { Database, Trash2, Download, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { HabitData } from '../types';
import { generateSampleData } from '../utils/sampleData';

interface DataManagementProps {
  habitData: HabitData;
  onLoadSampleData: (data: HabitData) => void;
  onClearData: () => void;
}

export const DataManagement: React.FC<DataManagementProps> = ({
  habitData,
  onLoadSampleData,
  onClearData
}) => {
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showSampleConfirm, setShowSampleConfirm] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleLoadSampleData = () => {
    try {
      onLoadSampleData(generateSampleData());
      setMessage({ type: 'success', text: 'Sample data loaded. Explore the app with realistic examples.' });
      setShowSampleConfirm(false);
    } catch {
      setMessage({ type: 'error', text: 'Failed to load sample data. Please try again.' });
    }
  };

  const handleClearData = () => {
    try {
      onClearData();
      setMessage({ type: 'success', text: 'All data cleared. You can start fresh or load sample data.' });
      setShowClearConfirm(false);
    } catch {
      setMessage({ type: 'error', text: 'Failed to clear data. Please try again.' });
    }
  };

  const totalCompletions = habitData.habits.reduce((t, h) => t + h.completedDates.length, 0);
  const totalPostponed = habitData.habits.reduce((t, h) => t + (h.postponedDates?.length || 0), 0);

  return (
    <div className="bg-surface rounded-2xl border border-edge p-4 sm:p-6">
      <div className="flex items-center gap-2.5 mb-1.5">
        <Database className="w-4 h-4 text-faint" />
        <h3 className="text-base sm:text-lg font-semibold text-ink">Data Management</h3>
      </div>

      <p className="text-soft text-sm mb-5">
        Load sample data to explore, or clear everything for a fresh start.
      </p>

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        <div className="p-4 bg-inset rounded-xl">
          <div className="font-medium text-ink text-sm mb-1">Load sample data</div>
          <p className="text-sm text-soft mb-3">
            Try the app with realistic habits and progress.
          </p>
          <button
            onClick={() => setShowSampleConfirm(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-accent text-white rounded-xl hover:bg-accent-hover transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            Load sample habits
          </button>
        </div>

        <div className="p-4 bg-inset rounded-xl">
          <div className="font-medium text-ink text-sm mb-1">Clear all data</div>
          <p className="text-sm text-soft mb-3">
            Remove all habits and progress permanently.
          </p>
          <button
            onClick={() => setShowClearConfirm(true)}
            disabled={habitData.habits.length === 0}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-status-missed-soft text-status-missed rounded-xl hover:bg-status-missed/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            <Trash2 className="w-4 h-4" />
            Clear all data
          </button>
        </div>
      </div>

      {/* Current Data Summary */}
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center p-3 bg-inset rounded-xl">
          <div className="text-lg font-bold text-ink">{habitData.habits.length}</div>
          <div className="text-xs text-soft font-medium">Habits</div>
        </div>
        <div className="text-center p-3 bg-inset rounded-xl">
          <div className="text-lg font-bold text-ink">{totalCompletions}</div>
          <div className="text-xs text-soft font-medium">Completions</div>
        </div>
        <div className="text-center p-3 bg-inset rounded-xl">
          <div className="text-lg font-bold text-ink">{totalPostponed}</div>
          <div className="text-xs text-soft font-medium">Postponed</div>
        </div>
      </div>

      {/* Status message */}
      {message && (
        <div className="flex items-center gap-2.5 p-3 mt-4 rounded-xl bg-inset text-sm text-ink">
          {message.type === 'success' ? (
            <CheckCircle className="w-4 h-4 text-status-completed flex-shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-status-missed flex-shrink-0" />
          )}
          <span className="flex-1">{message.text}</span>
          <button onClick={() => setMessage(null)} className="text-faint hover:text-soft transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Confirmation modals */}
      {(showSampleConfirm || showClearConfirm) && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 animate-backdrop-in">
          <div className="bg-surface border border-edge rounded-2xl p-6 max-w-md w-full animate-view-enter">
            <div className="flex items-center gap-2.5 mb-3">
              <AlertTriangle className={`w-5 h-5 ${showClearConfirm ? 'text-status-missed' : 'text-status-partial'}`} />
              <h3 className="text-base font-semibold text-ink">
                {showClearConfirm ? 'Clear all data?' : 'Load sample data?'}
              </h3>
            </div>
            <p className="text-soft text-sm mb-5 leading-relaxed">
              {showClearConfirm
                ? 'This permanently deletes all your habits and progress. This cannot be undone.'
                : habitData.habits.length > 0
                  ? 'This replaces your current habits with sample data. Your current progress will be lost.'
                  : 'This loads a set of sample habits with realistic progress.'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={showClearConfirm ? handleClearData : handleLoadSampleData}
                className={`flex-1 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium ${
                  showClearConfirm
                    ? 'bg-status-missed text-white hover:opacity-90'
                    : 'bg-accent text-white hover:bg-accent-hover'
                }`}
              >
                {showClearConfirm ? 'Clear all data' : 'Load sample data'}
              </button>
              <button
                onClick={() => { setShowClearConfirm(false); setShowSampleConfirm(false); }}
                className="flex-1 px-4 py-2.5 bg-inset text-ink rounded-xl hover:bg-edge-strong/60 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
