import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { FieldWrapper } from '../shared/FieldWrapper';
import { FieldLabel } from '../shared/FieldLabel';
import { FieldDescription } from '../shared/FieldDescription';
import { BaseFieldConfig } from '../../types/field.types';

interface CustomFieldProps extends BaseFieldConfig {
  type: 'custom';
  component?: React.ReactNode;
}

/**
 * CustomField Component
 * Custom field wrapper with label and description
 */
export const CustomField: React.FC<CustomFieldProps> = ({
  name,
  label,
  desc,
  required,
  customClass,
  isChild,
  noIndent,
  hidden,
  component,
  index,
}) => {
  return (
    <FieldWrapper
      customClass={customClass}
      isChild={isChild}
      noIndent={noIndent}
      hidden={hidden}
      index={index}
    >
      {label && (
        <FieldLabel
          name={name}
          label={label}
          required={required}
        />
      )}
      {desc && <FieldDescription desc={desc} />}
      <div>{component}</div>
    </FieldWrapper>
  );
};

