import React, { ReactNode } from 'react';

interface FieldWrapperProps {
  children: ReactNode;
  className?: string;
  customClass?: string;
  isChild?: boolean;
  noIndent?: boolean;
  hidden?: boolean;
  index?: number | string;
}

/**
 * FieldWrapper component
 * Provides consistent styling and layout for field components
 */
export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  children,
  className,
  customClass,
  isChild,
  noIndent,
  hidden,
  index,
}) => {
  if (hidden) {
    return <div className="d-none">{children}</div>;
  }

  const wrapperClasses = [
    customClass || 'mb-4',
    isChild && !noIndent ? 'ps-5' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses} key={index}>
      {children}
    </div>
  );
};

