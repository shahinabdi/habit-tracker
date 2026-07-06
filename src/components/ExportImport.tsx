import React, { useRef, useState } from 'react';
import { Download, Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { HabitData } from '../types';
import { exportHabits, importHabits, generateBackupData } from '../utils/exportUtils';

interface ExportImportProps {
  habitData: HabitData;
  onImport: (data: HabitData) => void;
}

export const ExportImport: React.FC<ExportImportProps> = ({ habitData, onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleExport = async () => {
    try {
      setIsProcessing(true);
      const backupData = generateBackupData(habitData);
      exportHabits(backupData);
      setMessage({ type: 'success', text: 'Habits exported successfully!' });
    } catch {
      setMessage({ type: 'error', text: 'Failed to export habits. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      setMessage({ type: 'info', text: 'Processing file...' });
      
      const importedData = await importHabits(file);
      onImport(importedData);
      setMessage({ type: 'success', text: 'Habits imported successfully!' });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to import habits' 
      });
    } finally {
      setIsProcessing(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'info':
        return <FileText className="w-4 h-4 text-blue-600" />;
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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-800">Backup & Restore</h3>
      </div>
      
      <p className="text-gray-600 text-sm mb-6">
        Export your habits to keep a backup or import habits from a previous export.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <button
          onClick={handleExport}
          disabled={isProcessing || habitData.habits.length === 0}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <Download className="w-4 h-4" />
          {isProcessing ? 'Exporting...' : 'Export Habits'}
        </button>

        <button
          onClick={handleImportClick}
          disabled={isProcessing}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <Upload className="w-4 h-4" />
          {isProcessing ? 'Processing...' : 'Import Habits'}
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />

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

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2">💡 Pro Tips:</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Export regularly to keep backups of your progress</li>
          <li>• Import files must be in JSON format from this app</li>
          <li>• Importing will replace all current habits</li>
          <li>• Your data is stored locally and never sent to servers</li>
        </ul>
      </div>
    </div>
  );
};
