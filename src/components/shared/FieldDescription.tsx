import React from 'react';
import { useFormContext } from '../../context/FormContext';

interface FieldDescriptionProps {
  desc?: string;
  className?: string;
  customDescClass?: string;
}

/**
 * FieldDescription component
 * Renders field description/helper text
 */
export const FieldDescription: React.FC<FieldDescriptionProps> = ({
  desc,
  className,
  customDescClass,
}) => {
  const { uiLibrary } = useFormContext();
  const { adapter } = uiLibrary;
  const FormHelperText = adapter.FormHelperText;

  if (!desc) return null;

  return (
    <FormHelperText className={customDescClass || className || ''}>
      {desc}
    </FormHelperText>
  );
};

