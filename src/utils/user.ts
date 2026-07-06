import type { User } from '@supabase/supabase-js';

export const getDisplayName = (user: User | null): string => {
  const fullName = user?.user_metadata?.full_name;
  if (typeof fullName === 'string' && fullName.trim()) return fullName.trim();
  return user?.email?.split('@')[0] ?? 'there';
};
