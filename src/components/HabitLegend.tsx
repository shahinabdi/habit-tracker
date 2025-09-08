import React from 'react';
import { Check, Clock, X, Calendar } from 'lucide-react';

export const HabitLegend: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="w-4 h-4 text-gray-600" />
        <h3 className="text-sm font-medium text-gray-800">Color Guide</h3>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-500 border-2 border-green-500 rounded-md flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
          <span className="text-gray-700">Completed</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-yellow-400 border-2 border-yellow-400 rounded-md flex items-center justify-center">
            <Clock className="w-3 h-3 text-white" />
          </div>
          <span className="text-gray-700">Postponed</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-red-100 border-2 border-red-200 rounded-md flex items-center justify-center">
            <X className="w-3 h-3 text-red-400" />
          </div>
          <span className="text-gray-700">Missed</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white border-2 border-blue-300 rounded-md ring-2 ring-blue-200"></div>
          <span className="text-gray-700">Today</span>
        </div>
      </div>
      
      <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-blue-700">
        💡 <strong>Tip:</strong> You can only mark habits for today. Click today's cell to cycle: Not done → Completed → Postponed → Not done
      </div>
    </div>
  );
};
