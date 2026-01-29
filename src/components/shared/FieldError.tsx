import React from 'react';
import { formatString } from '../../utils/field.utils';

interface FieldErrorProps {
  name: string;
  error?: string;
  touched?: boolean;
  showCustomError?: boolean;
  dataTestId?: string;
  className?: string;
}

/**
 * FieldError component
 * Displays validation error messages
 */
export const FieldError: React.FC<FieldErrorProps> = ({
  name,
  error,
  touched,
  showCustomError,
  dataTestId,
  className,
}) => {
  if (!showCustomError && (!error || !touched)) {
    return null;
  }

  return (
    <small
      id="error"
      data-testid={dataTestId || `${formatString(name)}-error`}
      className={className || 'd-flex text-danger mt-1 text-12'}
    >
      {error}
    </small>
  );
};

