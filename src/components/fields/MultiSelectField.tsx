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
 * MultiSelectField Component
 * Renders a multi-select dropdown using react-select
 * 
 * NOTE: This requires react-select as a peer dependency
 */
export const MultiSelectField: React.FC<SelectFieldConfig & { type: 'multiSelect' }> = ({
  name,
  type,
  label,
  desc,
  info,
  required,
  customClass,
  customDescClass,
  customComponentClass,
  isChild,
  noIndent,
  hidden,
  values = [],
  dataTestId,
  customHandleChange,
  component,
  blockComponent,
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

  // Convert values to array format if needed
  const options = Array.isArray(values)
    ? values
    : Object.entries(values).map(([value, label]) => ({
        value,
        label: String(label),
      }));

  // Handle multi-select value (array)
  const selectedValues = Array.isArray(fieldValue) ? fieldValue : [];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) =>
      option.value
    );

    const syntheticEvent = {
      target: {
        name,
        value: selectedOptions,
      },
    } as unknown as React.ChangeEvent<HTMLSelectElement>;

    if (customHandleChange) {
      customHandleChange(syntheticEvent, 'multiSelect');
    } else {
      activeFormik.setFieldValue(name, selectedOptions);
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
        data-testid={dataTestId || `${formatString(name)}-multi-select`}
      >
        {blockComponent && <div>{blockComponent}</div>}
        <FormControl className="w-100" required={required}>
          {label && (
            <FieldLabel
              name={name}
              label={label}
              required={required}
              info={info}
            />
          )}
          {desc && (
            <FieldDescription desc={desc} customDescClass={customDescClass} />
          )}
          <div data-testid={dataTestId || `${formatString(name)}-select`}>
            <select
              name={name}
              multiple
              value={selectedValues.map(String)}
              onChange={handleChange}
              onBlur={activeFormik.handleBlur}
              className={`form-select text-14 ${fieldError && fieldTouched ? 'border-danger' : ''}`}
            >
              {options.map((option) => (
                <option key={option.value} value={String(option.value)}>
                  {option.label}
                </option>
              ))}
            </select>
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
      {component && (
        <div className={customComponentClass || 'mb-1 mx-1'}>{component}</div>
      )}
    </>
  );
};

