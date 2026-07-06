const phrases = [
  'Small steps every day lead to big changes.',
  "Progress, not perfection — you're doing great.",
  'Every habit you keep is a vote for who you want to become.',
  "Consistency beats intensity. Keep showing up.",
  "One day at a time. You've got this.",
  'The best time to build a habit was yesterday. The next best time is today.',
  "Discipline is choosing between what you want now and what you want most.",
  'Tiny habits, remarkable results.',
  "You don't have to be perfect, just consistent.",
  'A little progress each day adds up to big results.',
  'Your future self will thank you for today.',
  'Keep going — momentum is on your side.',
];

const dayOfYear = (date: Date): number => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

export const getDailyPhrase = (date: Date = new Date()): string => {
  return phrases[dayOfYear(date) % phrases.length];
};

export const getGreeting = (date: Date = new Date()): string => {
  const hour = date.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};
