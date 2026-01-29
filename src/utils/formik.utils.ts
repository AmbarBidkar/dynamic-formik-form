/**
 * Formik utility functions extracted from production code
 * These handle nested property access, error extraction, etc.
 */

/**
 * Get nested property from object using dot notation or bracket notation
 * Supports paths like "user.name" or "users[0].name"
 */
export const getNestedProperty = (
  obj: Record<string, unknown> | undefined | null,
  path: string | undefined | null
): unknown => {
  if (!path || !obj) {
    return undefined;
  }

  // Handle both dot notation and bracket notation
  // Split by dots, brackets, and handle array indices
  const keys = path.split(/[.[\]]+/).filter(Boolean);

  return keys.reduce((acc: unknown, key: string) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
};

/**
 * Alternative nested property getter (simpler version)
 * Only supports dot notation
 */
export const getNestedValueNew = (
  obj: Record<string, unknown> | undefined | null,
  path: string
): unknown => {
  if (!obj || !path) {
    return undefined;
  }

  return path
    .split('.')
    .reduce(
      (acc: unknown, key: string) =>
        acc && typeof acc === 'object' && key in acc
          ? (acc as Record<string, unknown>)[key]
          : undefined,
      obj
    );
};

/**
 * Extract field value from Formik values using nested path
 */
export const getFieldValue = (
  formik: { values: Record<string, unknown> },
  name: string
): unknown => {
  if (!name) return null;

  if (name.includes('.')) {
    if (name.includes('[')) {
      // Array notation like "users[0].name"
      return getNestedProperty(formik.values, name);
    }
    // Dot notation like "user.name"
    return name
      .split('.')
      .reduce(
        (acc: unknown, key: string) =>
          acc && typeof acc === 'object' && key in acc
            ? (acc as Record<string, unknown>)[key]
            : '',
        formik.values
      );
  }

  return formik.values[name];
};

/**
 * Extract field error from Formik errors using nested path
 */
export const getFieldError = (
  formik: { errors: Record<string, unknown> },
  name: string
): string | undefined => {
  if (!name) return undefined;

  if (name.includes('.')) {
    if (name.includes('[')) {
      return getNestedProperty(formik.errors, name) as string | undefined;
    }
    return name
      .split('.')
      .reduce(
        (acc: unknown, key: string) =>
          acc && typeof acc === 'object' && key in acc
            ? (acc as Record<string, unknown>)[key]
            : '',
        formik.errors
      ) as string | undefined;
  }

  return formik.errors[name] as string | undefined;
};

/**
 * Extract field touched state from Formik touched using nested path
 */
export const getFieldTouched = (
  formik: { touched: Record<string, unknown> },
  name: string
): boolean => {
  if (!name) return false;

  if (name.includes('.')) {
    if (name.includes('[')) {
      return !!getNestedProperty(formik.touched, name);
    }
    return !!name
      .split('.')
      .reduce(
        (acc: unknown, key: string) =>
          acc && typeof acc === 'object' && key in acc
            ? (acc as Record<string, unknown>)[key]
            : false,
        formik.touched
      );
  }

  return !!formik.touched[name];
};

