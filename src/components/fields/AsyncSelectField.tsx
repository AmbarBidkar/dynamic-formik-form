import React, { useState } from 'react';
import { useFormContext } from '../../context/FormContext';
import { getFieldValue, getFieldError, getFieldTouched } from '../../utils/formik.utils';
import { FieldWrapper } from '../shared/FieldWrapper';
import { FieldLabel } from '../shared/FieldLabel';
import { FieldDescription } from '../shared/FieldDescription';
import { FieldError } from '../shared/FieldError';
import { formatString } from '../../utils/field.utils';
import { SelectFieldConfig } from '../../types/field.types';

/**
 * AsyncSelectField Component
 * Renders an async-loading select dropdown using react-select/async
 * 
 * NOTE: This requires react-select as a peer dependency
 */
export const AsyncSelectField: React.FC<SelectFieldConfig & { type: 'asyncSelect' }> = ({
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
  values = [],
  isMulti = false,
  loaderCall,
  dataTestId,
  customHandleChange,
  customFormChange,
  component,
  child,
  setFieldValuesRecursive,
  formik: formikProp,
  index,
}) => {
  const { uiLibrary, formik } = useFormContext();
  const { adapter } = uiLibrary;
  const FormControl = adapter.FormControl;
  const activeFormik = formikProp || formik;

  const [asyncLoading, setAsyncLoading] = useState(false);

  const fieldValue = getFieldValue(activeFormik, name);
  const fieldError = getFieldError(activeFormik, name);
  const fieldTouched = getFieldTouched(activeFormik, name);

  const loadAsyncSelectOptions = async (inputValue: string) => {
    if (!loaderCall) return [];
    setAsyncLoading(true);
    const { apps, error } = await loaderCall(inputValue);
    setAsyncLoading(false);
    if (error || !apps) {
      return [];
    }
    return apps;
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (customHandleChange) {
      customHandleChange(event, type);
    } else if (customFormChange) {
      customFormChange(event, type);
    } else {
      activeFormik.handleChange(event);
    }

    if (child && setFieldValuesRecursive) {
      setFieldValuesRecursive(child);
    }
  };

  const Select = adapter.Select;

  return (
    <>
      <FieldWrapper
        customClass={customClass}
        isChild={isChild}
        noIndent={noIndent}
        hidden={hidden}
        index={index}
        data-testid={dataTestId || `${formatString(name)}-async-select`}
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
          <div
            data-testid={dataTestId || `${formatString(name)}-async-select`}
          >
            <Select
              name={name}
              disabled={disabled}
              value={fieldValue ? String(fieldValue) : ''}
              onChange={handleChange}
              onBlur={activeFormik.handleBlur}
              error={!!(fieldError && fieldTouched)}
            >
              {asyncLoading && <option>Loading...</option>}
              {!asyncLoading &&
                values &&
                (Array.isArray(values)
                  ? values
                  : Object.entries(values).map(([value, label]) => ({
                      value,
                      label: String(label),
                    }))
                ).map((option: { value: string | number; label: string }) => (
                  <option key={option.value} value={String(option.value)}>
                    {option.label}
                  </option>
                ))}
            </Select>
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

