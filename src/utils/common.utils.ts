/**
 * Generate unique ID
 */
export const generateId = (): string =>
  `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

/**
 * Delay execution
 */
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Truncate text with ellipsis
 */
export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

/**
 * Capitalize first letter
 */
export const capitalize = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);
