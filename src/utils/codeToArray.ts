/**
 * Convert code string to array of characters
 * @param code - The code string to convert
 * @returns Array of characters
 */
export const codeToArray = (code?: string): string[] => code?.split('') ?? [];
