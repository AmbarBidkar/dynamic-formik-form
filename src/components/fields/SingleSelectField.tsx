import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { getFieldValue, getFieldError, getFieldTouched } from '../../utils/formik.utils';
import { FieldWrapper } from '../shared/FieldWrapper';
import { FieldLabel } from '../shared/FieldLabel';
import { FieldDescription } from '../shared/FieldDescription';
import { FieldError } from '../shared/FieldError';
import { formatString } from '../../utils/field.utils';
import { SelectFieldConfig } from '../../types/field.types';

/**
 * SingleSelectField Component
 * Renders a single-select dropdown using react-select
 * 
 * NOTE: This requires react-select as a peer dependency
 * Users must install: npm install react-select
 */
export const SingleSelectField: React.FC<SelectFieldConfig & { type: 'singleSelect' }> = ({
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
  isSearchable,
  isMulti = false,
  optionsLabel,
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

  const fieldValue = getFieldValue(activeFormik, name);
  const fieldError = getFieldError(activeFormik, name);
  const fieldTouched = getFieldTouched(activeFormik, name);

  // Convert values to react-select format if needed
  const options = Array.isArray(values)
    ? values
    : Object.entries(values).map(([value, label]) => ({
        value,
        label: String(label),
      }));

  // Find selected option
  const selectedOption = fieldValue
    ? options.find((opt) => opt.value === fieldValue)
    : null;

  // Handle react-select change event
  const handleSelectChange = (selected: { value: string | number; label: string } | null) => {
    const event = {
      target: {
        name,
        value: selected ? selected.value : '',
      },
    } as React.ChangeEvent<HTMLSelectElement>;

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

  // For now, we'll use the native Select adapter
  // In production, this would use react-select's Select component
  // Users would need to provide a react-select adapter or use the default
  const Select = adapter.Select;

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
          <div data-testid={dataTestId || `${formatString(name)}-single-select`}>
            <Select
              className={`text-14 ${isMulti ? '' : ''} ${
                fieldError && fieldTouched ? 'border-danger' : ''
              }`}
              name={name}
              disabled={disabled || false}
              value={selectedOption ? String(selectedOption.value) : ''}
              onChange={(event) => {
                const selected = options.find(
                  (opt) => String(opt.value) === event.target.value
                );
                handleSelectChange(selected || null);
              }}
              onBlur={activeFormik.handleBlur}
              error={!!(fieldError && fieldTouched)}
            >
              {options.map((option) => (
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
          // based on fieldValue === childField.hiddenlabel
          return null;
        })}
      {component && (
        <div className={customComponentClass || 'mb-1 mx-1'}>{component}</div>
      )}
    </>
  );
};

