import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { getFieldValue } from '../../utils/formik.utils';
import { BaseFieldConfig } from '../../types/field.types';

interface EmptyFieldProps extends BaseFieldConfig {
  type: 'emptyField';
}

/**
 * EmptyField Component
 * Renders a hidden input field (useful for form state management)
 */
export const EmptyField: React.FC<EmptyFieldProps> = ({
  name,
  customHandleChange,
  formik: formikProp,
}) => {
  const { uiLibrary, formik } = useFormContext();
  const { adapter } = uiLibrary;
  const Input = adapter.Input;
  const activeFormik = formikProp || formik;

  const fieldValue = getFieldValue(activeFormik, name) || '';

  return (
    <Input
      id={name}
      type="hidden"
      name={name}
      className="d-none"
      value={fieldValue as string}
      onChange={(event) => {
        if (customHandleChange) {
          customHandleChange(event, 'emptyField');
        } else {
          activeFormik.handleChange(event);
        }
      }}
      onBlur={activeFormik.handleBlur}
    />
  );
};

