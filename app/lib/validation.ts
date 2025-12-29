/**
 * Validates if a string is a well-formed URL
 */
export const validateURL = (url: string): boolean => {
  if (!url.trim()) {
    return false;
  }

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
