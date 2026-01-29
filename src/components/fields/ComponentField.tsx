import React from 'react';
import { FieldWrapper } from '../shared/FieldWrapper';
import { BaseFieldConfig } from '../../types/field.types';

interface ComponentFieldProps extends BaseFieldConfig {
  type: 'component';
  component?: React.ReactNode;
  blockComponent?: React.ReactNode;
}

/**
 * ComponentField Component
 * Wrapper for custom components
 */
export const ComponentField: React.FC<ComponentFieldProps> = ({
  customClass,
  isChild,
  noIndent,
  component,
  blockComponent,
  index,
}) => {
  return (
    <>
      {component && (
        <FieldWrapper
          customClass={customClass}
          isChild={isChild}
          noIndent={noIndent}
          index={index}
        >
          {component}
        </FieldWrapper>
      )}
      {blockComponent && (
        <FieldWrapper
          customClass={customClass}
          isChild={isChild}
          noIndent={noIndent}
          index={index}
        >
          {blockComponent}
        </FieldWrapper>
      )}
    </>
  );
};

