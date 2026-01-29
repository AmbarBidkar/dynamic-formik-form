import React, { useState, useCallback } from 'react';
import { useFormContext } from '../../context/FormContext';
import { getFieldValue, getFieldError, getFieldTouched } from '../../utils/formik.utils';
import { FieldWrapper } from '../shared/FieldWrapper';
import { FieldLabel } from '../shared/FieldLabel';
import { FieldDescription } from '../shared/FieldDescription';
import { FieldError } from '../shared/FieldError';
import { IconRenderer } from '../shared/IconRenderer';
import { formatString } from '../../utils/field.utils';
import { InputFieldConfig } from '../../types/field.types';

/**
 * InputField Component
 * Renders text input fields with various types (text, email, password, etc.)
 */
export const InputField: React.FC<InputFieldConfig> = ({
  name,
  type,
  label,
  placeholder,
  desc,
  info,
  required,
  disabled,
  hidden,
  readonly,
  fieldType = 'text',
  autocomplete,
  customClass,
  customLabelClass,
  dataTestId,
  isVisibleEnable,
  isCopyEnable,
  customIcon,
  customHandleChange,
  customFormChange,
  component,
  blockComponent,
  showCustomError,
  ref: inputRef,
  onBlur,
  isChild,
  noIndent,
  index,
  formik: formikProp,
}) => {
  const { uiLibrary, formik } = useFormContext();
  const { adapter, icons } = uiLibrary;
  const Input = adapter.Input;
  const IconButton = adapter.IconButton;
  const activeFormik = formikProp || formik;

  const [showField, setShowField] = useState<Record<string, boolean>>({});

  const fieldValue = getFieldValue(activeFormik, name);
  const fieldError = getFieldError(activeFormik, name);
  const fieldTouched = getFieldTouched(activeFormik, name);

  const showFieldHandler = useCallback((fieldName: string) => {
    setShowField((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  }, []);

  const handleCopy = useCallback(() => {
    if (typeof window !== 'undefined' && document) {
      const input = document.getElementById(name) as HTMLInputElement;
      if (input) {
        input.select();
        document.execCommand('copy');
      }
    }
  }, [name]);

  const VisibilityIcon = icons?.Visibility;
  const VisibilityOffIcon = icons?.VisibilityOff;
  const CopyIcon = icons?.Copy;

  const inputType =
    fieldType === 'password'
      ? !showField[name]
        ? 'password'
        : 'text'
      : fieldType;

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
          customLabelClass={customLabelClass}
        />
      )}
      {desc && <FieldDescription desc={desc} />}
      <div
        className={`input-group ${
          isCopyEnable || isVisibleEnable ? '' : 'rounded'
        }`}
      >
        <Input
          className={`form-control font-14 ${
            isCopyEnable || isVisibleEnable || customIcon
              ? 'border border-end-0'
              : 'rounded'
          } ${fieldError && fieldTouched ? 'border-danger' : ''}`}
          id={name}
          data-testid={dataTestId || `${formatString(name)}-input`}
          ref={inputRef}
          autoComplete={
            autocomplete || fieldType === 'password'
              ? 'new-password'
              : 'off'
          }
          type={inputType}
          disabled={disabled || false}
          name={name}
          placeholder={placeholder}
          value={(fieldValue as string) || ''}
          onChange={(event) => {
            if (customHandleChange) {
              customHandleChange(event, type);
            } else if (customFormChange) {
              customFormChange(event, type);
            } else {
              activeFormik.handleChange(event);
            }
          }}
          onBlur={onBlur || activeFormik.handleBlur}
          readOnly={readonly || false}
          error={!!(fieldError && fieldTouched)}
        />
        {customIcon && (
          <div
            className={`z-0 bg-transparent btn btn-outline-secondary border-0 border-top border-bottom px-3 ${
              !isCopyEnable && !isVisibleEnable
                ? 'border-end rounded-end'
                : ''
            } ${fieldError && fieldTouched ? 'border-danger' : ''}`}
            style={{ cursor: 'default' }}
          >
            {customIcon}
          </div>
        )}
        {isVisibleEnable && VisibilityIcon && VisibilityOffIcon && (
          <button
            className={`z-0 btn btn-outline-secondary border-0 rounded-0 border-top border-bottom ${
              !isCopyEnable ? 'border-end rounded-end' : ''
            } ${fieldError && fieldTouched ? 'border-danger' : ''}`}
            type="button"
            data-testid={`${formatString(name)}-visible-btn`}
            onClick={() => showFieldHandler(name)}
          >
            {!showField[name] ? (
              <IconRenderer Icon={VisibilityOffIcon} size={16} />
            ) : (
              <IconRenderer Icon={VisibilityIcon} size={16} />
            )}
          </button>
        )}
        {isCopyEnable && CopyIcon && (
          <button
            className={`z-0 btn btn-outline-secondary border border-start-0 border-end rounded-end ${
              fieldError && fieldTouched ? 'border-danger' : ''
            }`}
            type="button"
            data-testid={`${formatString(name)}-copy-btn`}
            aria-label="copy"
            onClick={handleCopy}
          >
            <IconRenderer Icon={CopyIcon} size={16} />
          </button>
        )}
        {component && <div>{component}</div>}
      </div>
      {blockComponent && <div>{blockComponent}</div>}
      {(showCustomError || (fieldError && fieldTouched)) && (
        <FieldError
          name={name}
          error={fieldError}
          touched={fieldTouched}
          showCustomError={showCustomError}
          dataTestId={dataTestId}
        />
      )}
    </FieldWrapper>
  );
};

