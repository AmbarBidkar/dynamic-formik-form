import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { getFieldValue, getFieldError, getFieldTouched } from '../../utils/formik.utils';
import { FieldWrapper } from '../shared/FieldWrapper';
import { FieldLabel } from '../shared/FieldLabel';
import { FieldDescription } from '../shared/FieldDescription';
import { FieldError } from '../shared/FieldError';
import { formatString } from '../../utils/field.utils';
import { TextareaFieldConfig } from '../../types/field.types';

/**
 * TextareaField Component
 * Renders a textarea input field
 */
export const TextareaField: React.FC<TextareaFieldConfig> = ({
  name,
  type,
  label,
  placeholder,
  desc,
  required,
  customClass,
  customComponentClass,
  isChild,
  noIndent,
  hidden,
  readonly,
  rows = 4,
  dataTestId,
  customHandleChange,
  customFormChange,
  component,
  formik: formikProp,
}) => {
  const { uiLibrary, formik } = useFormContext();
  const { adapter } = uiLibrary;
  const Textarea = adapter.Textarea;
  const activeFormik = formikProp || formik;

  const fieldValue = getFieldValue(activeFormik, name);
  const fieldError = getFieldError(activeFormik, name);
  const fieldTouched = getFieldTouched(activeFormik, name);

  return (
    <>
      <FieldWrapper
        customClass={customClass}
        isChild={isChild}
        noIndent={noIndent}
        hidden={hidden}
      >
        {label && (
          <FieldLabel
            name={name}
            label={label}
            required={required}
          />
        )}
        {desc && <FieldDescription desc={desc} />}
        <div>
          <Textarea
            id={name}
            className={`form-control text-14 ${
              required && fieldError && fieldTouched
                ? 'border-danger'
                : ''
            }`}
            name={name}
            data-testid={dataTestId || `${formatString(name)}-text-box`}
            placeholder={placeholder}
            rows={rows}
            value={(fieldValue as string) || ''}
            autoComplete="off"
            onChange={(event) => {
              if (customHandleChange) {
                customHandleChange(event, type);
              } else if (customFormChange) {
                customFormChange(event, type);
              } else {
                activeFormik.handleChange(event);
              }
            }}
            onBlur={activeFormik.handleBlur}
            readOnly={readonly || false}
            disabled={readonly || false}
            error={!!(required && fieldError && fieldTouched)}
          />
        </div>
        {required && fieldError && fieldTouched && (
          <FieldError
            name={name}
            error={fieldError}
            touched={fieldTouched}
            dataTestId={dataTestId}
          />
        )}
      </FieldWrapper>
      {component && (
        <div className={customComponentClass || 'mb-1 mx-1'}>{component}</div>
      )}
    </>
  );
};

