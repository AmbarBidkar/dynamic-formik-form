/**
 * Validation utility functions
 */

/**
 * Validate email address
 */
export const validateEmail = (email: string | undefined | null): boolean => {
  if (!email) return false;

  const value = email.trim().toLowerCase();
  const strictRegex =
    /^[a-z0-9]+([._-]?[a-z0-9]+)*@[a-z0-9]+([.-]?[a-z0-9]+)*\.[a-z]{2,}$/;

  return strictRegex.test(value);
};

/**
 * Validate URL
 */
export const isValidUrl = (url: string | undefined | null): boolean => {
  if (!url) return false;

  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Check if username is valid
 */
export const checkValidUsername = (
  username: string,
  minLength: number,
  maxLength: number
): boolean => {
  const regex = new RegExp(`^[a-zA-Z0-9-_\\.]{${minLength},${maxLength}}$`);
  return regex.test(String(username));
};

