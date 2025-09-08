// Utility functions for habit validation and duplicate checking

/**
 * Calculates the similarity between two strings using a simple algorithm
 * Returns a value between 0 (completely different) and 1 (identical)
 */
export const calculateStringSimilarity = (str1: string, str2: string): number => {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();
  
  if (s1 === s2) return 1;
  if (s1.length === 0 || s2.length === 0) return 0;
  
  // Simple similarity based on common characters and length
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  
  if (longer.length === 0) return 1;
  
  // Count common characters
  let commonChars = 0;
  for (let i = 0; i < shorter.length; i++) {
    if (longer.includes(shorter[i])) {
      commonChars++;
    }
  }
  
  return commonChars / longer.length;
};

/**
 * Checks if a habit name is too similar to existing habits
 * Returns the similar habit name if found, null otherwise
 */
export const findSimilarHabit = (
  newHabitName: string, 
  existingHabits: Array<{ name: string }>,
  threshold: number = 0.8
): string | null => {
  const trimmedName = newHabitName.trim().toLowerCase();
  
  for (const habit of existingHabits) {
    const existingName = habit.name.trim().toLowerCase();
    
    // Exact match (case-insensitive)
    if (trimmedName === existingName) {
      return habit.name;
    }
    
    // Check for high similarity
    const similarity = calculateStringSimilarity(trimmedName, existingName);
    if (similarity >= threshold) {
      return habit.name;
    }
    
    // Check if one is contained in the other
    if (trimmedName.includes(existingName) || existingName.includes(trimmedName)) {
      return habit.name;
    }
  }
  
  return null;
};

/**
 * Suggests alternative names when a duplicate is detected
 */
export const suggestAlternativeNames = (originalName: string): string[] => {
  const suggestions = [
    `${originalName} (Morning)`,
    `${originalName} (Evening)`,
    `${originalName} (Daily)`,
    `${originalName} (Weekly)`,
    `Advanced ${originalName}`,
    `Better ${originalName}`,
  ];
  
  return suggestions.slice(0, 3); // Return top 3 suggestions
};
