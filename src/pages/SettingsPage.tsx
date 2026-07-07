import React from 'react';
import { DataManagement } from '../components/DataManagement';
import { ExportImport } from '../components/ExportImport';
import { About } from '../components/About';
import { useHabits } from '../hooks/useHabits';

export const SettingsPage: React.FC = () => {
  const { habitData, importHabits, loadSampleData, clearData } = useHabits();

  return (
    <div className="space-y-4">
      <DataManagement
        habitData={habitData}
        onLoadSampleData={loadSampleData}
        onClearData={clearData}
      />
      <ExportImport habitData={habitData} onImport={importHabits} />
      <About />
    </div>
  );
};
