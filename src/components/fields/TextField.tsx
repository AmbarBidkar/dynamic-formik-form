import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { getFieldValue, getFieldError, getFieldTouched } from '../../utils/formik.utils';
import { FieldWrapper } from '../shared/FieldWrapper';
import { FieldLabel } from '../shared/FieldLabel';
import { FieldError } from '../shared/FieldError';
import { BaseFieldConfig } from '../../types/field.types';

interface TextFieldProps extends BaseFieldConfig {
  type: 'text';
  error?: string;
}

/**
 * TextField Component
 * Displays read-only text (not an input field)
 */
export const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  required,
  customClass,
  isChild,
  noIndent,
  hidden,
  dataTestId,
  showCustomError,
  error: customError,
  index,
  formik: formikProp,
}) => {
  const { formik } = useFormContext();
  const activeFormik = formikProp || formik;

  const fieldValue = getFieldValue(activeFormik, name);
  const fieldError = getFieldError(activeFormik, name);
  const fieldTouched = getFieldTouched(activeFormik, name);

  // Handle group heading logic from production code
  const isGroupHeading =
    typeof name === 'string' && name.endsWith('__heading');
  const groupKeyForHeading = isGroupHeading ? name.split('__')[0] : null;
  const groupLevelError = groupKeyForHeading
    ? getFieldError(activeFormik, groupKeyForHeading)
    : null;
  const resolvedTextError = showCustomError && customError ? customError : (groupLevelError || fieldError);
  const showErrorNow =
    !!resolvedTextError && (fieldTouched || activeFormik.submitCount > 0 || showCustomError);

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
        />
      )}
      <div>
        <p onClick={() => {}}>{fieldValue as string}</p>
      </div>
      {(showCustomError || showErrorNow) && (
        <FieldError
          name={name}
          error={resolvedTextError}
          touched={fieldTouched}
          showCustomError={showCustomError}
          dataTestId={dataTestId}
        />
      )}
    </FieldWrapper>
  );
};

