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
 * DropdownField Component
 * Renders a native HTML select dropdown
 */
export const DropdownField: React.FC<SelectFieldConfig & { type: 'dropdown' }> = ({
  name,
  type,
  label,
  desc,
  info,
  required,
  disabled,
  customClass,
  isChild,
  noIndent,
  hidden,
  values = {},
  headerKey,
  dataTestId,
  isCopyEnable,
  resetChild = true,
  ignoreChar,
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
  const Select = adapter.Select;
  const FormControl = adapter.FormControl;
  const activeFormik = formikProp || formik;

  const fieldValue = getFieldValue(activeFormik, name);
  const fieldError = getFieldError(activeFormik, name);
  const fieldTouched = getFieldTouched(activeFormik, name);

  const handleSetFieldValuesRecursive = (childFields: typeof child, parentValue?: string) => {
    if (childFields && setFieldValuesRecursive) {
      setFieldValuesRecursive(childFields, parentValue);
    }
  };

  // Handle values as object or array
  const options = Array.isArray(values)
    ? values
    : Object.entries(values).map(([key, value]) => ({
        value: key,
        label: value || key,
      }));

  // Sort options - empty string first
  const sortedOptions = [...options].sort((a, b) => {
    if (a.value === '') return -1;
    return 0;
  });

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
          <Select
            className={`form-select text-14 ${
              isCopyEnable ? 'border border-end-0' : ''
            } ${fieldError && fieldTouched ? 'border-danger' : ''}`}
            id={name}
            name={name}
            data-testid={dataTestId || `${formatString(name)}-dropdown`}
            disabled={disabled || false}
            value={(fieldValue as string) || ''}
            onChange={(event) => {
              if (customHandleChange) {
                customHandleChange(event, type, typeof index === 'number' ? index : undefined);
              } else if (customFormChange) {
                customFormChange(event, type);
              } else {
                activeFormik.handleChange(event);
              }
              if (resetChild) {
                handleSetFieldValuesRecursive(child, event.target.value);
              }
            }}
            onBlur={activeFormik.handleBlur}
            error={!!(fieldError && fieldTouched)}
          >
            {headerKey && <option>{headerKey}</option>}
            {sortedOptions.map((option, i) => (
              <option
                key={i}
                data-testid={`${formatString(String(option.value), ignoreChar)}-option`}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </Select>
          {(fieldError && fieldTouched) && (
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
        <div className="mb-1 mx-1">{component}</div>
      )}
    </>
  );
};

