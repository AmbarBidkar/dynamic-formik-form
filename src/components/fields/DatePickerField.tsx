import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { getFieldValue, getFieldError, getFieldTouched } from '../../utils/formik.utils';
import { FieldWrapper } from '../shared/FieldWrapper';
import { FieldLabel } from '../shared/FieldLabel';
import { FieldError } from '../shared/FieldError';
import { formatString } from '../../utils/field.utils';
import { DatePickerFieldConfig } from '../../types/field.types';

/**
 * DatePickerField Component
 * Renders a date picker component
 * 
 * NOTE: This requires a date picker library (e.g., @mui/x-date-pickers, react-datepicker)
 * Users must provide a DatePicker component in their UI adapter
 */
export const DatePickerField: React.FC<DatePickerFieldConfig & { type: 'datePicker' }> = ({
  name,
  type,
  label,
  info,
  required,
  disabled,
  customClass,
  isChild,
  noIndent,
  hidden,
  dateFormat = 'DD/MM/YYYY',
  dataTestId,
  component,
  formik: formikProp,
  index,
}) => {
  const { uiLibrary, formik } = useFormContext();
  const { adapter } = uiLibrary;
  const activeFormik = formikProp || formik;

  const fieldValue = getFieldValue(activeFormik, name);
  const fieldError = getFieldError(activeFormik, name);
  const fieldTouched = getFieldTouched(activeFormik, name);

  // If DatePicker is not available in adapter, fallback to text input
  const DatePicker = adapter.DatePicker;
  const Input = adapter.Input;

  const handleDateChange = (date: unknown) => {
    // Format date based on dateFormat
    let formattedDate = '';
    if (date) {
      if (typeof date === 'string') {
        formattedDate = date;
      } else if (date instanceof Date) {
        // Simple formatting - users should use a proper date library
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        formattedDate = `${day}/${month}/${year}`;
      }
    }
    activeFormik.setFieldValue(name, formattedDate);
  };

  if (!DatePicker) {
    // Fallback to text input if DatePicker not available
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
            info={info}
          />
        )}
        <div className="col-xs-12 col-md-5 col-sm-9 px-0">
          <Input
            type="date"
            name={name}
            data-testid={dataTestId || `${formatString(name)}-date-picker`}
            value={(fieldValue as string) || ''}
            onChange={(event) => activeFormik.handleChange(event)}
            onBlur={activeFormik.handleBlur}
            disabled={disabled || false}
            error={!!(fieldError && fieldTouched)}
          />
        </div>
        {fieldError && fieldTouched && (
          <FieldError
            name={name}
            error={fieldError}
            touched={fieldTouched}
            dataTestId={dataTestId}
          />
        )}
        {component && <div className="mt-3">{component}</div>}
      </FieldWrapper>
    );
  }

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
          info={info}
        />
      )}
      <div className="col-xs-12 col-md-5 col-sm-9 px-0">
        <DatePicker
          value={fieldValue || null}
          onChange={handleDateChange}
          format={dateFormat}
          disabled={disabled}
          data-testid={dataTestId || `${formatString(name)}-date-picker`}
        />
      </div>
      {fieldError && fieldTouched && (
        <FieldError
          name={name}
          error={fieldError}
          touched={fieldTouched}
          dataTestId={dataTestId}
        />
      )}
      {component && <div className="mt-3">{component}</div>}
    </FieldWrapper>
  );
};

