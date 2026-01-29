import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { getFieldValue, getFieldError, getFieldTouched } from '../../utils/formik.utils';
import { FieldWrapper } from '../shared/FieldWrapper';
import { FieldLabel } from '../shared/FieldLabel';
import { FieldDescription } from '../shared/FieldDescription';
import { FieldError } from '../shared/FieldError';
import { IconRenderer } from '../shared/IconRenderer';
import { formatString } from '../../utils/field.utils';
import { CheckboxFieldConfig } from '../../types/field.types';

/**
 * CheckboxField Component
 * Renders a checkbox input field
 */
export const CheckboxField: React.FC<CheckboxFieldConfig> = ({
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
  dataTestId,
  showCustomError,
  customHandleChange,
  customFormChange,
  component,
  child,
  formik: formikProp,
}) => {
  const { uiLibrary, formik } = useFormContext();
  const { adapter, icons } = uiLibrary;
  const Checkbox = adapter.Checkbox;
  const FormHelperText = adapter.FormHelperText;
  const IconButton = adapter.IconButton;
  const activeFormik = formikProp || formik;

  const fieldValue = getFieldValue(activeFormik, name);
  const fieldError = getFieldError(activeFormik, name);
  const fieldTouched = getFieldTouched(activeFormik, name);
  const InfoIcon = icons?.Info;

  const setFieldValuesRecursive = (childFields: typeof child) => {
    if (childFields) {
      childFields.forEach((c) => {
        activeFormik.setFieldValue(c.name, '');
        activeFormik.setFieldTouched(c.name, false);
      });
    }
  };

  return (
    <>
      <FieldWrapper
        customClass={customClass}
        isChild={isChild}
        noIndent={noIndent}
        hidden={hidden}
      >
        <Checkbox
          id={name}
          name={name}
          data-testid={dataTestId || `${formatString(name)}-check-box`}
          checked={!!fieldValue}
          disabled={disabled || false}
          onChange={(event) => {
            if (customHandleChange) {
              customHandleChange(event, type);
            } else if (customFormChange) {
              customFormChange(event, type);
            } else {
              activeFormik.handleChange(event);
            }
            if (!event.target.checked) {
              setFieldValuesRecursive(child);
            }
          }}
          label={
            <div className="d-flex flex-column align-items-start">
              <p className="text-14 text-dark fw-medium align-items-center">
                {label}
                {required && <span className="text-danger"> *</span>}
                      {info && InfoIcon && (
                        <IconButton
                          size="small"
                          className="p-0"
                          aria-label="show info"
                          tabIndex={-1}
                        >
                          <IconRenderer Icon={InfoIcon} size={16} />
                        </IconButton>
                      )}
              </p>
            </div>
          }
          error={!!(fieldError && fieldTouched)}
        />
        {desc && (
          <FormHelperText className="text-black-50 mt-0 mb-1">
            {desc}
          </FormHelperText>
        )}
        {(showCustomError || (fieldError && fieldTouched)) && (
          <FieldError
            name={name}
            error={fieldError}
            touched={fieldTouched}
            showCustomError={showCustomError}
            dataTestId={dataTestId}
          />
        )}
        {component && (
          <div className={customComponentClass || 'mb-1 mx-1'}>
            {component}
          </div>
        )}
      </FieldWrapper>
      {child &&
        child.map((c, childIndex) => {
          return (
            fieldValue &&
            // This would need to be handled by DynamicForm orchestrator
            // For now, we'll just render the child if value is truthy
            null
          );
        })}
    </>
  );
};

