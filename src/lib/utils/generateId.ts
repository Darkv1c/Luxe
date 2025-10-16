/**
 * Generates a unique ID for form elements
 * @param prefix - Prefix for the ID (e.g., 'input', 'select', 'checkbox')
 * @returns A unique ID string
 */
export function generateId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}
