import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { formatString } from '../../utils/field.utils';
import { IconRenderer } from './IconRenderer';

interface FieldLabelProps {
  name: string;
  label?: string;
  required?: boolean;
  showOptional?: boolean;
  info?: string;
  htmlFor?: string;
  className?: string;
  customLabelClass?: string;
}

/**
 * FieldLabel component
 * Renders label with required indicator, optional text, and info tooltip
 */
export const FieldLabel: React.FC<FieldLabelProps> = ({
  name,
  label,
  required,
  showOptional,
  info,
  htmlFor,
  className,
  customLabelClass,
}) => {
  const { uiLibrary } = useFormContext();
  const { adapter, icons } = uiLibrary;
  const Label = adapter.Label;
  const IconButton = adapter.IconButton;

  if (!label) return null;

  const InfoIcon = icons?.Info;

  return (
    <Label
      htmlFor={htmlFor || name}
      className={`${customLabelClass || className || ''}`}
    >
      <span>{label}</span>
      {required && <span className="text-danger"> *</span>}
      {showOptional && (
        <span className="text-12 ps-1 text-body-tertiary"> (Optional)</span>
      )}
      {info && InfoIcon && (
        <IconButton
          size="small"
          className="p-0"
          aria-label="show info"
          tabIndex={-1}
        >
          <IconRenderer Icon={InfoIcon} size={16} />
        </IconButton>
      )}
    </Label>
  );
};

