import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { FieldWrapper } from '../shared/FieldWrapper';
import { FieldLabel } from '../shared/FieldLabel';
import { FieldDescription } from '../shared/FieldDescription';
import { formatString } from '../../utils/field.utils';
import { BaseFieldConfig } from '../../types/field.types';

interface LinkFieldProps extends BaseFieldConfig {
  type: 'link';
  onClickLink?: () => void;
}

/**
 * LinkField Component
 * Renders a clickable link/button field
 */
export const LinkField: React.FC<LinkFieldProps> = ({
  name,
  label,
  desc,
  required,
  customClass,
  customComponentClass,
  isChild,
  noIndent,
  hidden,
  onClickLink,
  component,
  targetType,
  index,
}) => {
  const handleClick = () => {
    if (onClickLink) {
      onClickLink();
    }
  };

  return (
    <>
      <FieldWrapper
        customClass={customClass}
        isChild={isChild}
        noIndent={noIndent}
        hidden={hidden}
        index={index}
      >
        {label && (
          <a
            href={targetType === 'blank' ? '#' : undefined}
            target={targetType === 'blank' ? '_blank' : undefined}
            onClick={(e) => {
              e.preventDefault();
              handleClick();
            }}
            style={{ cursor: 'pointer' }}
          >
            {label}
            {required && <span className="text-danger"> *</span>}
          </a>
        )}
        {desc && <FieldDescription desc={desc} />}
      </FieldWrapper>
      {component && (
        <div className={customComponentClass || 'mb-1 mx-1'}>{component}</div>
      )}
    </>
  );
};

