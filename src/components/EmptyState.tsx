import React from 'react';
import { Download, Plus, Lightbulb, TrendingUp } from 'lucide-react';

interface EmptyStateProps {
  onLoadSampleData: () => void;
  onSwitchToSettings: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onLoadSampleData, onSwitchToSettings }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
      <div className="max-w-md mx-auto">
        {/* Icon */}
        <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <TrendingUp className="w-8 h-8 text-emerald-600" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Welcome to Habit Tracker!
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 mb-6">
          You haven't created any habits yet. Start building positive habits that will transform your life!
        </p>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={onLoadSampleData}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Download className="w-4 h-4" />
            Try Sample Habits
          </button>
          
          <div className="text-sm text-gray-500">or</div>
          
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Plus className="w-4 h-4" />
            <span>Add your first habit above</span>
          </div>
        </div>

        {/* Sample Ideas */}
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-left">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-yellow-600" />
            <h4 className="font-medium text-yellow-800">Popular Habit Ideas:</h4>
          </div>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• 💧 Drink 8 glasses of water daily</li>
            <li>• 🏃‍♀️ Exercise for 30 minutes</li>
            <li>• 📚 Read for 20 minutes</li>
            <li>• 🧘‍♂️ Meditate for 10 minutes</li>
            <li>• 📝 Write in a journal</li>
          </ul>
        </div>

        {/* Settings Link */}
        <div className="mt-4">
          <button
            onClick={onSwitchToSettings}
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Explore more options in Settings →
          </button>
        </div>
      </div>
    </div>
  );
};
