import { HabitData } from '../types';

export const generateSampleData = (): HabitData => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // Generate dates for the current month
  const generateHabitDates = (habit: string, completionRate: number, postponeRate: number = 0.1) => {
    const completedDates: string[] = [];
    const postponedDates: string[] = [];
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    for (let day = 1; day <= Math.min(daysInMonth, currentDate.getDate()); day++) {
      // Use a pseudo-random approach based on habit name and day for consistent sample data
      const randomValue = (habit.charCodeAt(0) + day) % 100;
      
      if (randomValue < completionRate * 100) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        completedDates.push(dateStr);
      } else if (randomValue < (completionRate + postponeRate) * 100) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        postponedDates.push(dateStr);
      }
    }
    
    return { completedDates, postponedDates };
  };

  const sampleHabits = [
    {
      id: 1001,
      name: '💧 Drink 8 glasses of water',
      ...generateHabitDates('water', 0.8, 0.1)
    },
    {
      id: 1002,
      name: '🏃‍♀️ 30 minutes exercise',
      ...generateHabitDates('exercise', 0.7, 0.15)
    },
    {
      id: 1003,
      name: '📚 Read for 20 minutes',
      ...generateHabitDates('reading', 0.6, 0.2)
    },
    {
      id: 1004,
      name: '🧘‍♂️ Meditate for 10 minutes',
      ...generateHabitDates('meditation', 0.5, 0.15)
    },
    {
      id: 1005,
      name: '📝 Write in journal',
      ...generateHabitDates('journal', 0.4, 0.1)
    },
    {
      id: 1006,
      name: '🥗 Eat healthy breakfast',
      ...generateHabitDates('breakfast', 0.9, 0.05)
    },
    {
      id: 1007,
      name: '📱 No phone before 9 AM',
      ...generateHabitDates('noPhone', 0.3, 0.25)
    },
    {
      id: 1008,
      name: '🛏️ Make bed every morning',
      ...generateHabitDates('makeBed', 0.85, 0.1)
    }
  ];

  return {
    habits: sampleHabits
  };
};

export const getSampleHabitSuggestions = (): string[] => {
  return [
    '💧 Drink 8 glasses of water',
    '🏃‍♀️ 30 minutes exercise',
    '📚 Read for 20 minutes',
    '🧘‍♂️ Meditate for 10 minutes',
    '📝 Write in journal',
    '🥗 Eat healthy breakfast',
    '🛏️ Make bed every morning',
    '📱 No phone 1 hour before bed',
    '🚶‍♀️ Take 10,000 steps',
    '💤 Sleep 8 hours',
    '🎯 Practice gratitude',
    '💪 Do 20 push-ups',
    '🥤 No sugary drinks',
    '📞 Call family/friends',
    '🧹 Clean for 15 minutes',
    '💻 Learn something new for 30 min',
    '🎨 Practice a hobby',
    '🌱 Eat 5 servings of fruits/vegetables',
    '💰 Track expenses',
    '🌅 Wake up at same time daily'
  ];
};
