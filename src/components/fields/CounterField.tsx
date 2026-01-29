import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { getFieldValue, getFieldError, getFieldTouched } from '../../utils/formik.utils';
import { FieldWrapper } from '../shared/FieldWrapper';
import { FieldLabel } from '../shared/FieldLabel';
import { FieldDescription } from '../shared/FieldDescription';
import { FieldError } from '../shared/FieldError';
import { formatString } from '../../utils/field.utils';
import { CounterFieldConfig } from '../../types/field.types';

/**
 * CounterField Component
 * Renders a counter component with increment/decrement buttons
 * 
 * NOTE: This is a simplified version. Users can provide a custom Counter component
 * via the component prop or extend the adapter
 */
export const CounterField: React.FC<CounterFieldConfig> = ({
  name,
  type,
  label,
  desc,
  info,
  required,
  customClass,
  customComponentClass,
  isChild,
  noIndent,
  hidden,
  min,
  max,
  suffix,
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
  const Button = adapter.Button;
  const Input = adapter.Input;
  const activeFormik = formikProp || formik;

  const fieldValue = getFieldValue(activeFormik, name);
  const numericValue = Number(fieldValue) || 0;
  const fieldError = getFieldError(activeFormik, name);
  const fieldTouched = getFieldTouched(activeFormik, name);

  const handleIncrement = () => {
    const newValue = max !== undefined ? Math.min(numericValue + 1, max) : numericValue + 1;
    const event = {
      name,
      value: newValue,
    };
    if (customHandleChange) {
      customHandleChange(event as any, type);
    } else if (customFormChange) {
      customFormChange(event as any, type);
    } else {
      activeFormik.handleChange(event as any);
    }
  };

  const handleDecrement = () => {
    const newValue = min !== undefined ? Math.max(numericValue - 1, min) : numericValue - 1;
    const event = {
      name,
      value: newValue,
    };
    if (customHandleChange) {
      customHandleChange(event as any, type);
    } else if (customFormChange) {
      customFormChange(event as any, type);
    } else {
      activeFormik.handleChange(event as any);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (isNaN(value)) return;

    let newValue = value;
    if (min !== undefined && value < min) newValue = min;
    if (max !== undefined && value > max) newValue = max;

    const syntheticEvent = {
      target: {
        name,
        value: newValue,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    if (customHandleChange) {
      customHandleChange(syntheticEvent, type);
    } else if (customFormChange) {
      customFormChange(syntheticEvent, type);
    } else {
      activeFormik.handleChange(syntheticEvent);
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
          <div className="d-flex align-items-center gap-2">
            <Button
              type="button"
              onClick={handleDecrement}
              disabled={min !== undefined && numericValue <= min}
            >
              −
            </Button>
            <Input
              type="number"
              name={name}
              data-testid={dataTestId || `${formatString(name)}-counter`}
              value={numericValue}
              onChange={handleInputChange}
              onBlur={activeFormik.handleBlur}
              min={min}
              max={max}
              className="text-center"
              style={{ width: '80px' }}
              error={!!(fieldError && fieldTouched)}
            />
            {suffix && <span>{suffix}</span>}
            <Button
              type="button"
              onClick={handleIncrement}
              disabled={max !== undefined && numericValue >= max}
            >
              +
            </Button>
          </div>
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

