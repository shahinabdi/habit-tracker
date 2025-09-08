import { HabitData } from '../types';

export const exportHabits = (habitData: HabitData): void => {
  try {
    const dataStr = JSON.stringify(habitData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `habit-tracker-export-${new Date().toISOString().split('T')[0]}.json`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('Error exporting habits:', error);
    throw new Error('Failed to export habits');
  }
};

export const importHabits = (file: File): Promise<HabitData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content) as HabitData;
        
        // Validate the data structure
        if (!data || typeof data !== 'object' || !Array.isArray(data.habits)) {
          throw new Error('Invalid habit data format');
        }
        
        // Validate each habit
        for (const habit of data.habits) {
          if (!habit.id || !habit.name || !Array.isArray(habit.completedDates)) {
            throw new Error('Invalid habit structure');
          }
        }
        
        resolve(data);
      } catch (error) {
        reject(new Error('Failed to parse habit data. Please check the file format.'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read the file'));
    };
    
    reader.readAsText(file);
  });
};

export const generateBackupData = (habitData: HabitData) => {
  const backup = {
    ...habitData,
    exportDate: new Date().toISOString(),
    version: '1.0.0',
    appName: 'Habit Tracker by Shahin ABDI'
  };
  
  return backup;
};
