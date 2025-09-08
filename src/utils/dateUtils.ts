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