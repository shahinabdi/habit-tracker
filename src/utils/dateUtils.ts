export const getMonthName = (month: number): string => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month];
};

export const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const formatDate = (year: number, month: number, day: number): string => {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

export const isToday = (dateString: string): boolean => {
  const today = new Date();
  const todayString = formatDate(today.getFullYear(), today.getMonth(), today.getDate());
  return dateString === todayString;
};

export const getTodayString = (): string => {
  const today = new Date();
  return formatDate(today.getFullYear(), today.getMonth(), today.getDate());
};

export const isFutureDate = (dateString: string): boolean => {
  const today = new Date();
  const todayString = formatDate(today.getFullYear(), today.getMonth(), today.getDate());
  return dateString > todayString;
};

export const isPastDate = (dateString: string): boolean => {
  const today = new Date();
  const todayString = formatDate(today.getFullYear(), today.getMonth(), today.getDate());
  return dateString < todayString;
};

export const parseDateString = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const addDays = (dateString: string, days: number): string => {
  const date = parseDateString(dateString);
  date.setDate(date.getDate() + days);
  return formatDate(date.getFullYear(), date.getMonth(), date.getDate());
};

export const addMonths = (dateString: string, months: number): string => {
  const date = parseDateString(dateString);
  const targetMonth = date.getMonth() + months;
  return formatDate(date.getFullYear(), targetMonth, 1);
};

// Sunday-start 7-date range containing dateString
export const getWeekDates = (dateString: string): string[] => {
  const date = parseDateString(dateString);
  const startOfWeek = addDays(dateString, -date.getDay());
  return Array.from({ length: 7 }, (_, i) => addDays(startOfWeek, i));
};

const dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const dayNamesLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const getDayNameShort = (dateString: string): string => {
  return dayNamesShort[parseDateString(dateString).getDay()];
};

export const getDayNameLong = (dateString: string): string => {
  return dayNamesLong[parseDateString(dateString).getDay()];
};

export const getFriendlyDateLabel = (dateString: string): string => {
  if (isToday(dateString)) return 'Today';
  if (dateString === addDays(getTodayString(), -1)) return 'Yesterday';
  if (dateString === addDays(getTodayString(), 1)) return 'Tomorrow';

  const date = parseDateString(dateString);
  return `${dayNamesLong[date.getDay()]}, ${getMonthName(date.getMonth())} ${date.getDate()}`;
};