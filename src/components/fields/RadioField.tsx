import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { getFieldValue, getFieldError, getFieldTouched } from '../../utils/formik.utils';
import { FieldWrapper } from '../shared/FieldWrapper';
import { FieldLabel } from '../shared/FieldLabel';
import { FieldDescription } from '../shared/FieldDescription';
import { FieldError } from '../shared/FieldError';
import { formatString } from '../../utils/field.utils';
import { RadioFieldConfig } from '../../types/field.types';

/**
 * RadioField Component
 * Renders a radio button group
 */
export const RadioField: React.FC<RadioFieldConfig> = ({
  name,
  type,
  label,
  desc,
  required,
  disabled,
  customClass,
  customComponentClass,
  isChild,
  noIndent,
  hidden,
  values = {},
  dataTestId,
  customHandleChange,
  customFormChange,
  component,
  child,
  formik: formikProp,
}) => {
  const { uiLibrary, formik } = useFormContext();
  const { adapter } = uiLibrary;
  const Radio = adapter.Radio;
  const FormHelperText = adapter.FormHelperText;
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
        <div
          id={name}
          data-testid={dataTestId || `${formatString(name)}-btn`}
          role="radiogroup"
        >
          {Object.entries(values).map(([key, value], index) => (
            <Radio
              key={key}
              name={name}
              value={key}
              checked={fieldValue === key || fieldValue === value}
              disabled={disabled || false}
              onChange={(event) => {
                if (customHandleChange) {
                  customHandleChange(event, type);
                } else if (customFormChange) {
                  customFormChange(event, type);
                } else {
                  activeFormik.handleChange(event);
                }
                if (!event.target.checked && child) {
                  child.forEach((c) => {
                    activeFormik.setFieldValue(c.name, '');
                  });
                }
              }}
              label={<p className="font-14 text-secondary m-0">{value}</p>}
            />
          ))}
        </div>
        {desc && (
          <FormHelperText className="text-black-50 mb-1">{desc}</FormHelperText>
        )}
        {fieldError && fieldTouched && (
          <FieldError
            name={name}
            error={fieldError}
            touched={fieldTouched}
            dataTestId={dataTestId}
          />
        )}
        {component && (
          <div className={customComponentClass || 'mb-1 mx-1'}>{component}</div>
        )}
      </FieldWrapper>
      {child &&
        child.map((c, i) => {
          // Child rendering logic would be handled by DynamicForm orchestrator
          return null;
        })}
    </>
  );
};

