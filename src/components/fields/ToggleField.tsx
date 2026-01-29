import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { getFieldValue, getFieldError, getFieldTouched } from '../../utils/formik.utils';
import { FieldError } from '../shared/FieldError';
import { FieldLabel } from '../shared/FieldLabel';
import { formatString } from '../../utils/field.utils';
import { BaseFieldConfig } from '../../types/field.types';

interface ToggleFieldProps extends BaseFieldConfig {
  type: 'toggle';
}

/**
 * ToggleField Component
 * Renders a switch/toggle component
 */
export const ToggleField: React.FC<ToggleFieldProps> = ({
  name,
  type,
  label,
  required,
  disabled,
  customClass,
  isChild,
  noIndent,
  dataTestId,
  customHandleChange,
  customFormChange,
  formik: formikProp,
}) => {
  const { uiLibrary, formik } = useFormContext();
  const { adapter } = uiLibrary;
  const Switch = adapter.Switch;
  const activeFormik = formikProp || formik;

  const fieldValue = getFieldValue(activeFormik, name);
  const fieldError = getFieldError(activeFormik, name);
  const fieldTouched = getFieldTouched(activeFormik, name);

  return (
    <div
      className={`d-flex gap-2 align-items-center ${
        isChild && !noIndent ? 'ps-5' : ''
      }`}
    >
      <Switch
        id={name}
        name={name}
        data-testid={dataTestId || `${formatString(name)}-check-box`}
        disabled={disabled || false}
        checked={!!fieldValue}
        onChange={(event) => {
          const newValue = event.target.checked;
          if (customHandleChange) {
            customHandleChange(event, type);
          } else if (customFormChange) {
            customFormChange(event, type);
          } else {
            activeFormik.setFieldValue(name, newValue);
          }
        }}
      />
      {label && (
        <FieldLabel
          name={name}
          label={label}
          required={required}
          htmlFor={name}
        />
      )}
      {fieldError && fieldTouched && (
        <FieldError
          name={name}
          error={fieldError}
          touched={fieldTouched}
          dataTestId={dataTestId}
        />
      )}
    </div>
  );
};

