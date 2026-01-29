import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { getFieldValue, getFieldError, getFieldTouched } from '../../utils/formik.utils';
import { FieldWrapper } from '../shared/FieldWrapper';
import { FieldLabel } from '../shared/FieldLabel';
import { FieldDescription } from '../shared/FieldDescription';
import { FieldError } from '../shared/FieldError';
import { formatString } from '../../utils/field.utils';
import { DatePickerFieldConfig } from '../../types/field.types';

/**
 * DateTimePickerField Component
 * Renders a date-time picker component
 * 
 * NOTE: This requires a date-time picker library (e.g., @mui/x-date-pickers)
 * Users must provide a DateTimePicker component in their UI adapter
 */
export const DateTimePickerField: React.FC<DatePickerFieldConfig & { type: 'dateTimePicker' }> = ({
  name,
  type,
  label,
  desc,
  info,
  required,
  disabled,
  customClass,
  customComponentClass,
  isChild,
  noIndent,
  hidden,
  views,
  disablePast,
  dataTestId,
  customHandleChange,
  customFormChange,
  component,
  child,
  formik: formikProp,
  index,
}) => {
  const { uiLibrary, formik } = useFormContext();
  const { adapter } = uiLibrary;
  const FormControl = adapter.FormControl;
  const activeFormik = formikProp || formik;

  const fieldValue = getFieldValue(activeFormik, name);
  const fieldError = getFieldError(activeFormik, name);
  const fieldTouched = getFieldTouched(activeFormik, name);

  const DateTimePicker = adapter.DateTimePicker;
  const Input = adapter.Input;

  const handleDateTimeChange = (date: unknown) => {
    const event = {
      name,
      value: date,
    };

    if (customHandleChange) {
      customHandleChange(event as any, type);
    } else if (customFormChange) {
      customFormChange(event as any, type);
    } else {
      activeFormik.handleChange(event as any);
    }
  };

  // Determine format based on views
  const format =
    Array.isArray(views) &&
    views.length === 2 &&
    views[0] === 'day' &&
    views[1] === 'hours'
      ? 'DD/MM/YYYY HH:mm:ss'
      : 'DD/MM/YYYY HH:mm';

  if (!DateTimePicker) {
    // Fallback to datetime-local input
    return (
      <FieldWrapper
        customClass={customClass}
        isChild={isChild}
        noIndent={noIndent}
        hidden={hidden}
        index={index}
      >
        <FormControl
          className="w-100"
          required={required}
          error={!!(fieldTouched && fieldError)}
        >
          {label && (
            <FieldLabel
              name={name}
              label={label}
              required={required}
              info={info}
            />
          )}
          {desc && <FieldDescription desc={desc} />}
          <Input
            type="datetime-local"
            name={name}
            data-testid={dataTestId || `${formatString(name)}-date-time-picker`}
            value={(fieldValue as string) || ''}
            onChange={(event) => activeFormik.handleChange(event)}
            onBlur={activeFormik.handleBlur}
            disabled={disabled || false}
            error={!!(fieldError && fieldTouched)}
          />
          {fieldError && fieldTouched && (
            <FieldError
              name={name}
              error={fieldError}
              touched={fieldTouched}
              dataTestId={dataTestId}
            />
          )}
        </FormControl>
      </FieldWrapper>
    );
  }

  return (
    <>
      <FieldWrapper
        customClass={customClass}
        isChild={isChild}
        noIndent={noIndent}
        hidden={hidden}
        index={index}
      >
        <FormControl
          className="w-100"
          required={required}
          error={!!(fieldTouched && fieldError)}
        >
          {label && (
            <FieldLabel
              name={name}
              label={label}
              required={required}
              info={info}
            />
          )}
          {desc && <FieldDescription desc={desc} />}
          <DateTimePicker
            value={fieldValue || null}
            onChange={handleDateTimeChange}
            format={format}
            disabled={disabled}
            views={views}
            disablePast={disablePast}
            data-testid={dataTestId || `${formatString(name)}-date-time-picker`}
          />
          {fieldError && fieldTouched && (
            <FieldError
              name={name}
              error={fieldError}
              touched={fieldTouched}
              dataTestId={dataTestId}
            />
          )}
        </FormControl>
      </FieldWrapper>
      {child &&
        child.map((childField, childIndex) => {
          // Child rendering would be handled by DynamicForm orchestrator
          return null;
        })}
      {component && (
        <div className={customComponentClass || 'mb-1 mx-1'}>{component}</div>
      )}
    </>
  );
};

