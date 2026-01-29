/**
 * Field utility functions
 */

/**
 * Format string for use in data-testid attributes
 * Converts camelCase, snake_case, and spaces to kebab-case
 */
export const formatString = (
  inputStr: string | undefined | null,
  ignoreChar = false
): string => {
  if (!inputStr) return '';

  let result = inputStr.replace(/_/g, '-').toLowerCase();
  result = result.replace(/\s+/g, '-');
  result = result.replace(/([a-z])([A-Z])/g, '$1-$2');
  
  if (!ignoreChar) {
    result = result.replace(/\//g, '-');
  }
  
  return result;
};

/**
 * Convert camelCase to kebab-case
 */
export const camelToKebabCase = (str: string): string => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

/**
 * Sanitize label for CSS class names
 */
export const sanitizeLabelForCSS = (label: string | undefined | null): string => {
  return label?.replace(/\s+/g, '_') || '';
};

/**
 * Check if value is blank (null, undefined, or empty string)
 */
export const isBlank = (value: unknown): boolean => {
  return value === null || value === undefined || value === '';
};

/**
 * Check if value is not blank
 */
export const isNotBlank = (value: unknown): boolean => {
  return !isBlank(value);
};

