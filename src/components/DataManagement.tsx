import React, { useState } from 'react';
import { Database, Trash2, Download, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';
import { HabitData } from '../types';
import { generateSampleData, getSampleHabitSuggestions } from '../utils/sampleData';

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
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  const handleLoadSampleData = () => {
    try {
      const sampleData = generateSampleData();
      onLoadSampleData(sampleData);
      setMessage({ type: 'success', text: 'Sample data loaded successfully! Explore the app with realistic habit examples.' });
      setShowSampleConfirm(false);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load sample data. Please try again.' });
    }
  };

  const handleClearData = () => {
    try {
      onClearData();
      setMessage({ type: 'success', text: 'All data cleared successfully! You can start fresh or load sample data.' });
      setShowClearConfirm(false);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to clear data. Please try again.' });
    }
  };

  const clearMessage = () => {
    setMessage(null);
  };

  const getMessageIcon = () => {
    if (!message) return null;
    
    switch (message.type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'info':
        return <Database className="w-4 h-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const getMessageStyles = () => {
    if (!message) return '';
    
    switch (message.type) {
      case 'success':
        return 'bg-green-50 text-green-800 border-green-200';
      case 'error':
        return 'bg-red-50 text-red-800 border-red-200';
      case 'info':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      default:
        return '';
    }
  };

  const sampleSuggestions = getSampleHabitSuggestions().slice(0, 6);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Database className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-800">Data Management</h3>
      </div>
      
      <p className="text-gray-600 text-sm mb-6">
        Manage your habit data with sample data for testing or clear everything to start fresh.
      </p>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Load Sample Data */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Download className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-blue-800">Load Sample Data</span>
          </div>
          <p className="text-sm text-blue-700 mb-3">
            Try the app with realistic habit examples and progress data
          </p>
          <button
            onClick={() => setShowSampleConfirm(true)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Load Sample Habits
          </button>
        </div>

        {/* Clear All Data */}
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-center gap-2 mb-2">
            <Trash2 className="w-4 h-4 text-red-600" />
            <span className="font-medium text-red-800">Clear All Data</span>
          </div>
          <p className="text-sm text-red-700 mb-3">
            Remove all habits and progress to start completely fresh
          </p>
          <button
            onClick={() => setShowClearConfirm(true)}
            disabled={habitData.habits.length === 0}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            Clear All Data
          </button>
        </div>
      </div>

      {/* Sample Habit Suggestions */}
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-yellow-600" />
          <h4 className="font-medium text-yellow-800">Sample Habit Ideas</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {sampleSuggestions.map((habit, index) => (
            <div key={index} className="text-sm text-yellow-700 bg-yellow-100 px-2 py-1 rounded">
              {habit}
            </div>
          ))}
        </div>
        <p className="text-xs text-yellow-600 mt-2">
          Load sample data to see these habits with realistic progress!
        </p>
      </div>

      {/* Current Data Info */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
        <h4 className="font-medium text-gray-700 mb-2">Current Data Summary</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Habits:</span>
            <span className="font-medium">{habitData.habits.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Completions:</span>
            <span className="font-medium">
              {habitData.habits.reduce((total, habit) => total + habit.completedDates.length, 0)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Postponed:</span>
            <span className="font-medium">
              {habitData.habits.reduce((total, habit) => total + (habit.postponedDates?.length || 0), 0)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Data Size:</span>
            <span className="font-medium">{(JSON.stringify(habitData).length / 1024).toFixed(1)} KB</span>
          </div>
        </div>
      </div>

      {/* Confirmation Modals */}
      {showSampleConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <h3 className="text-lg font-semibold">Load Sample Data</h3>
            </div>
            <p className="text-gray-600 mb-4">
              This will {habitData.habits.length > 0 ? 'replace your current habits with' : 'load'} sample habit data. 
              {habitData.habits.length > 0 && ' Your current progress will be lost.'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleLoadSampleData}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Load Sample Data
              </button>
              <button
                onClick={() => setShowSampleConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-semibold">Clear All Data</h3>
            </div>
            <p className="text-gray-600 mb-4">
              This will permanently delete all your habits and progress data. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleClearData}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Clear All Data
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Messages */}
      {message && (
        <div className={`flex items-center gap-2 p-3 rounded-lg border ${getMessageStyles()}`}>
          {getMessageIcon()}
          <span className="flex-1 text-sm">{message.text}</span>
          <button
            onClick={clearMessage}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
      )}

      {/* Pro Tips */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2">💡 Pro Tips:</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Use sample data to explore all app features</li>
          <li>• Export your data before clearing for backup</li>
          <li>• Sample data includes realistic progress patterns</li>
          <li>• Clear data gives you a completely fresh start</li>
        </ul>
      </div>
    </div>
  );
};
