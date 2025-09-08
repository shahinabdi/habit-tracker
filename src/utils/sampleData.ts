import { HabitData } from '../types';

export const generateSampleData = (): HabitData => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // Generate dates for the current month
  const generateCompletedDates = (habit: string, completionRate: number) => {
    const dates: string[] = [];
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    for (let day = 1; day <= Math.min(daysInMonth, currentDate.getDate()); day++) {
      // Use a pseudo-random approach based on habit name and day for consistent sample data
      const shouldComplete = (habit.charCodeAt(0) + day) % 100 < completionRate * 100;
      if (shouldComplete) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        dates.push(dateStr);
      }
    }
    
    return dates;
  };

  const sampleHabits = [
    {
      id: 1001,
      name: '💧 Drink 8 glasses of water',
      completedDates: generateCompletedDates('water', 0.8)
    },
    {
      id: 1002,
      name: '🏃‍♀️ 30 minutes exercise',
      completedDates: generateCompletedDates('exercise', 0.7)
    },
    {
      id: 1003,
      name: '📚 Read for 20 minutes',
      completedDates: generateCompletedDates('reading', 0.6)
    },
    {
      id: 1004,
      name: '🧘‍♂️ Meditate for 10 minutes',
      completedDates: generateCompletedDates('meditation', 0.5)
    },
    {
      id: 1005,
      name: '📝 Write in journal',
      completedDates: generateCompletedDates('journal', 0.4)
    },
    {
      id: 1006,
      name: '🥗 Eat healthy breakfast',
      completedDates: generateCompletedDates('breakfast', 0.9)
    },
    {
      id: 1007,
      name: '📱 No phone before 9 AM',
      completedDates: generateCompletedDates('noPhone', 0.3)
    },
    {
      id: 1008,
      name: '🛏️ Make bed every morning',
      completedDates: generateCompletedDates('makeBed', 0.85)
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
