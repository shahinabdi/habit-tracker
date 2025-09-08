export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const getMonthName = (month: number): string => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month];
};

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const calculateStreak = (completedDates: string[], currentMonth: number, currentYear: number): number => {
  if (completedDates.length === 0) return 0;
  
  const today = new Date();
  const sortedDates = completedDates
    .map(date => new Date(date))
    .filter(date => date <= today)
    .sort((a, b) => b.getTime() - a.getTime());
  
  if (sortedDates.length === 0) return 0;
  
  let streak = 0;
  let currentDate = new Date(today);
  currentDate.setHours(0, 0, 0, 0);
  
  // Check if today or yesterday was completed (to account for different timezones)
  const lastCompletedDate = sortedDates[0];
  lastCompletedDate.setHours(0, 0, 0, 0);
  
  const daysDiff = Math.floor((currentDate.getTime() - lastCompletedDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysDiff > 1) return 0; // Streak broken
  
  // Count consecutive days
  for (let i = 0; i < sortedDates.length; i++) {
    const dateStr = formatDate(sortedDates[i]);
    if (completedDates.includes(dateStr)) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }
  
  return streak;
};