import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { getFieldValue, getFieldError, getFieldTouched } from '../../utils/formik.utils';
import { FieldWrapper } from '../shared/FieldWrapper';
import { FieldLabel } from '../shared/FieldLabel';
import { FieldDescription } from '../shared/FieldDescription';
import { FieldError } from '../shared/FieldError';
import { IconRenderer } from '../shared/IconRenderer';
import { formatString } from '../../utils/field.utils';
import { FileUploadFieldConfig } from '../../types/field.types';

/**
 * FileUploadField Component
 * Renders a file upload input field
 */
export const FileUploadField: React.FC<FileUploadFieldConfig> = ({
  name,
  type,
  label,
  info,
  required,
  customClass,
  customComponentClass,
  isChild,
  noIndent,
  dataTestId,
  customHandleChange,
  customFormChange,
  component,
  ref: inputRef,
  formik: formikProp,
  index,
}) => {
  const { uiLibrary, formik } = useFormContext();
  const { adapter, icons } = uiLibrary;
  const Input = adapter.Input;
  const Button = adapter.Button;
  const IconButton = adapter.IconButton;
  const activeFormik = formikProp || formik;

  const fieldValue = getFieldValue(activeFormik, name);
  const fieldError = getFieldError(activeFormik, name);
  const fieldTouched = getFieldTouched(activeFormik, name);
  const InfoIcon = icons?.Info;
  const DeleteIcon = icons?.Delete;

  const handleRemoveFile = () => {
    activeFormik.setFieldValue(name, null);
  };

  const fileValue = fieldValue as File | string | null;
  const fileName =
    fileValue instanceof File
      ? fileValue.name
      : typeof fileValue === 'string'
      ? fileValue.split('/').pop()
      : null;

  return (
    <>
      <FieldWrapper
        customClass={customClass}
        isChild={isChild}
        noIndent={noIndent}
        index={index}
      >
        {label && (
          <FieldLabel
            name={name}
            label={label}
            required={required}
            info={info}
          />
        )}
        {!fileValue && (
            <input
              className={`form-control ${
                required && fieldError && fieldTouched
                  ? 'border-danger'
                  : ''
              }`}
              type="file"
              id={name}
              name={name}
              data-testid={dataTestId || `${formatString(name)}-file`}
              ref={inputRef as React.Ref<HTMLInputElement>}
              onChange={(event) => {
                if (customHandleChange) {
                  customHandleChange(event, type);
                } else if (customFormChange) {
                  customFormChange(event, type);
                } else {
                  activeFormik.handleChange(event);
                }
                if (event.currentTarget.files?.[0]) {
                  activeFormik.setFieldValue(name, event.currentTarget.files[0]);
                }
              }}
              onBlur={activeFormik.handleBlur}
            />
        )}
        {required && fieldError && fieldTouched && (
          <FieldError
            name={name}
            error={fieldError}
            touched={fieldTouched}
            dataTestId={dataTestId}
          />
        )}

        {fileValue && (
          <>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                File: {fileName}
              </div>
              <Button
                variant="text"
                data-testid={`${formatString(name)}-remove-btn`}
                className="text-14 text-capitalize p-1 text-danger gap-1 col-3"
                onClick={handleRemoveFile}
              >
                      {DeleteIcon && <IconRenderer Icon={DeleteIcon} size={16} />} Remove File
              </Button>
            </div>
            {fieldError && (
              <FieldError
                name={name}
                error={fieldError}
                touched={fieldTouched}
                dataTestId={dataTestId}
              />
            )}
          </>
        )}
      </FieldWrapper>
      {component && (
        <div className={customComponentClass || 'mb-1 mx-1'}>
          {component}
        </div>
      )}
    </>
  );
};

