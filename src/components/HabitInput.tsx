import React, { useState } from 'react';
import { Plus, Lightbulb, X } from 'lucide-react';
import { getSampleHabitSuggestions } from '../utils/sampleData';

interface HabitInputProps {
  onAddHabit: (name: string) => { success: boolean; similarHabit?: string };
}

export const HabitInput: React.FC<HabitInputProps> = ({ onAddHabit }) => {
  const [habitName, setHabitName] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (habitName.trim()) {
      const result = onAddHabit(habitName.trim());
      if (result.success) {
        setHabitName('');
        setErrorMessage('');
      } else {
        setErrorMessage(
          result.similarHabit 
            ? `Similar habit "${result.similarHabit}" already exists! Please choose a different name.`
            : 'This habit already exists! Please choose a different name.'
        );
      }
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    const result = onAddHabit(suggestion);
    if (result.success) {
      setShowSuggestions(false);
      setErrorMessage('');
    } else {
      setErrorMessage(
        result.similarHabit
          ? `Similar habit "${result.similarHabit}" already exists! Please choose a different one.`
          : 'This habit already exists! Please choose a different one.'
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHabitName(e.target.value);
    if (errorMessage) {
      setErrorMessage(''); // Clear error when user starts typing
    }
  };

  const suggestions = getSampleHabitSuggestions().slice(0, 8);

  return (
    <div className="mb-6 sm:mb-8">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={habitName}
              onChange={handleInputChange}
              placeholder="Add a new habit..."
              className={`w-full px-4 py-3 text-sm sm:text-base border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 placeholder-gray-400 ${
                errorMessage 
                  ? 'border-red-300 bg-red-50' 
                  : 'border-gray-200'
              }`}
              maxLength={50}
            />
            {errorMessage && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <X className="h-4 w-4" />
                {errorMessage}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 flex items-center space-x-2 text-sm whitespace-nowrap"
            >
              <Lightbulb className="h-4 w-4" />
              <span>Ideas</span>
            </button>
            <button
              type="submit"
              disabled={!habitName.trim()}
              className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 font-medium text-sm sm:text-base whitespace-nowrap"
            >
              <Plus className="h-4 w-4" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </form>

      {/* Habit Suggestions */}
      {showSuggestions && (
        <div className="mt-4 bg-white border border-gray-200 rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-500" />
              <h3 className="font-medium text-gray-800">Habit Ideas</h3>
            </div>
            <button
              onClick={() => setShowSuggestions(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-left p-3 bg-gray-50 hover:bg-emerald-50 hover:border-emerald-200 border border-gray-100 rounded-lg transition-all duration-200 text-sm"
              >
                {suggestion}
              </button>
            ))}
          </div>
          <div className="mt-3 text-xs text-gray-500 text-center">
            Click any suggestion to add it as a habit
          </div>
        </div>
      )}
    </div>
  );
};