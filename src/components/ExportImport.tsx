import React, { useRef, useState } from 'react';
import { Download, Upload, FileText, AlertCircle, CheckCircle, X } from 'lucide-react';
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
      setMessage({ type: 'success', text: 'Habits exported successfully.' });
    } catch {
      setMessage({ type: 'error', text: 'Failed to export habits. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      setMessage({ type: 'info', text: 'Processing file…' });

      const importedData = await importHabits(file);
      onImport(importedData);
      setMessage({ type: 'success', text: 'Habits imported successfully.' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to import habits'
      });
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const messageIcon =
    message?.type === 'success' ? <CheckCircle className="w-4 h-4 text-status-completed flex-shrink-0" /> :
    message?.type === 'error' ? <AlertCircle className="w-4 h-4 text-status-missed flex-shrink-0" /> :
    <FileText className="w-4 h-4 text-faint flex-shrink-0" />;

  return (
    <div className="bg-surface rounded-2xl border border-edge p-4 sm:p-6">
      <div className="flex items-center gap-2.5 mb-1.5">
        <FileText className="w-4 h-4 text-faint" />
        <h3 className="text-base sm:text-lg font-semibold text-ink">Backup & Restore</h3>
      </div>

      <p className="text-soft text-sm mb-5">
        Export your habits as a JSON backup, or restore from a previous export.
        Importing replaces your current habits.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleExport}
          disabled={isProcessing || habitData.habits.length === 0}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-accent text-white rounded-xl hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
        >
          <Download className="w-4 h-4" />
          {isProcessing ? 'Exporting…' : 'Export habits'}
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isProcessing}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-inset text-ink rounded-xl hover:bg-edge-strong/60 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
        >
          <Upload className="w-4 h-4" />
          {isProcessing ? 'Processing…' : 'Import habits'}
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
        <div className="flex items-center gap-2.5 p-3 mt-4 rounded-xl bg-inset text-sm text-ink">
          {messageIcon}
          <span className="flex-1">{message.text}</span>
          <button onClick={() => setMessage(null)} className="text-faint hover:text-soft transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
