import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { getFieldValue, getFieldError, getFieldTouched } from '../../utils/formik.utils';
import { FieldWrapper } from '../shared/FieldWrapper';
import { FieldLabel } from '../shared/FieldLabel';
import { FieldDescription } from '../shared/FieldDescription';
import { IconRenderer } from '../shared/IconRenderer';
import { formatString } from '../../utils/field.utils';
import { FieldArrayConfig } from '../../types/field.types';
import { useTranslation } from '../../hooks/useTranslation';

/**
 * FieldArrayField Component
 * Renders dynamic array fields (key-value pairs or simple arrays)
 */
export const FieldArrayField: React.FC<FieldArrayConfig> = ({
  name,
  type,
  label,
  desc,
  info,
  required,
  showOptional,
  customClass,
  customComponentClass,
  isButtonVisible = true,
  buttonLabel,
  properties,
  component,
  formik: formikProp,
  index,
}) => {
  const { uiLibrary, formik } = useFormContext();
  const { adapter, icons } = uiLibrary;
  const Input = adapter.Input;
  const Button = adapter.Button;
  const IconButton = adapter.IconButton;
  const activeFormik = formikProp || formik;
  const { t } = useTranslation();

  const fieldValue = getFieldValue(activeFormik, name);
  const arrayValue = Array.isArray(fieldValue) ? fieldValue : [];
  const AddIcon = icons?.Add;
  const DeleteIcon = icons?.Delete;

  const deleteRow = (indexToDelete: number) => {
    const updatedArray = arrayValue.filter((_, i) => i !== indexToDelete);
    activeFormik.setFieldValue(name, updatedArray);
  };

  const addRow = () => {
    if (properties?.isKeyValue) {
      activeFormik.setFieldValue(name, [...arrayValue, { key: '', value: '' }]);
    } else {
      activeFormik.setFieldValue(name, [...arrayValue, '']);
    }
  };

  const isKeyValue = properties?.isKeyValue || false;

  return (
    <FieldWrapper customClass={customClass} index={index}>
      {label && (
        <FieldLabel
          name={name}
          label={label}
          required={required}
          showOptional={showOptional}
          info={info}
        />
      )}
      {desc && <FieldDescription desc={desc} />}
      {component && (
        <div className={customComponentClass || 'mb-2'}>{component}</div>
      )}

      {isKeyValue ? (
        <>
          {arrayValue.map((item: { key?: string; value?: string }, itemIndex: number) => (
            <div key={itemIndex} className="d-flex mb-2 gap-2">
              <div className="col">
                <Input
                  name={`${name}[${itemIndex}].key`}
                  data-testid={
                    formatString(name) + '-key-field'
                  }
                  className={`form-control font-14 ${
                    (activeFormik.touched[name] as unknown as Record<string, unknown>)?.[itemIndex] &&
                    (activeFormik.errors[name] as unknown as Record<string, Record<string, string>>)?.[itemIndex]?.key
                      ? 'border-danger'
                      : ''
                  }`}
                  value={item.key || ''}
                  onChange={(event) => {
                    const newValue = [...arrayValue];
                    newValue[itemIndex] = {
                      ...newValue[itemIndex],
                      key: event.target.value,
                    };
                    activeFormik.setFieldValue(name, newValue);
                  }}
                  onBlur={activeFormik.handleBlur}
                  placeholder={properties?.keyPlaceholder || 'Enter key'}
                  autoComplete="off"
                />
                {(() => {
                  const errorKey = (activeFormik.errors[name] as unknown as Record<string, Record<string, string>>)?.[itemIndex]?.key;
                  const isTouched = (activeFormik.touched[name] as unknown as Record<string, unknown>)?.[itemIndex];
                  return isTouched && errorKey ? (
                    <small
                      data-testid={`${formatString(name)}-key-error`}
                      className="d-flex text-danger mt-1 text-12"
                    >
                      {String(errorKey)}
                    </small>
                  ) : null;
                })()}
              </div>
              <div className="col">
                <Input
                  name={`${name}[${itemIndex}].value`}
                  data-testid={formatString(name) + '-value-field'}
                  className={`form-control font-14 ${
                    (activeFormik.touched[name] as unknown as Record<string, unknown>)?.[itemIndex] &&
                    (activeFormik.errors[name] as unknown as Record<string, Record<string, string>>)?.[itemIndex]?.value
                      ? 'border-danger'
                      : ''
                  }`}
                  value={item.value || ''}
                  onChange={(event) => {
                    const newValue = [...arrayValue];
                    newValue[itemIndex] = {
                      ...newValue[itemIndex],
                      value: event.target.value,
                    };
                    activeFormik.setFieldValue(name, newValue);
                  }}
                  onBlur={activeFormik.handleBlur}
                  placeholder={
                    properties?.valuePlaceholder || 'Enter value'
                  }
                  autoComplete="off"
                />
                {(() => {
                  const errorValue = (activeFormik.errors[name] as unknown as Record<string, Record<string, string>>)?.[itemIndex]?.value;
                  const isTouched = (activeFormik.touched[name] as unknown as Record<string, unknown>)?.[itemIndex];
                  return isTouched && errorValue ? (
                    <small
                      data-testid={`${formatString(name)}-value-error`}
                      className="d-flex text-danger mt-1 text-12"
                    >
                      {String(errorValue)}
                    </small>
                  ) : null;
                })()}
              </div>
              {arrayValue.length !== 1 && (
                <div>
                  {IconButton && DeleteIcon ? (
                    <IconButton
                      size="small"
                      data-testid={`${formatString(name)}-del-btn`}
                      onClick={() => deleteRow(itemIndex)}
                    >
                      <IconRenderer Icon={DeleteIcon} size={20} className="text-danger" />
                    </IconButton>
                  ) : (
                    <button
                      type="button"
                      data-testid={`${formatString(name)}-del-btn`}
                      onClick={() => deleteRow(itemIndex)}
                    >
                      ×
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
          {isButtonVisible && (
            <div>
              <Button
                variant="text"
                className="text-primary text-capitalize text-start"
                startIcon={AddIcon ? <IconRenderer Icon={AddIcon} size={16} /> : '+'}
                data-testid={`${formatString(name)}-add-btn`}
                onClick={addRow}
              >
                {buttonLabel || t('COMMON:add')}
              </Button>
            </div>
          )}
        </>
      ) : (
        <>
          {arrayValue.map((item: string, itemIndex: number) => (
            <div key={itemIndex} className="d-flex mb-2">
              <div className="col">
                <Input
                  name={`${name}[${itemIndex}]`}
                  data-testid={formatString(name) + '-field'}
                  className={`form-control font-14 ${
                    (activeFormik.touched[name] as unknown as unknown[])?.[itemIndex] &&
                    (activeFormik.errors[name] as unknown as unknown[])?.[itemIndex]
                      ? 'border-danger'
                      : ''
                  }`}
                  value={item}
                  onChange={(event) => {
                    const newValue = [...arrayValue];
                    newValue[itemIndex] = event.target.value;
                    activeFormik.setFieldValue(name, newValue);
                  }}
                  onBlur={activeFormik.handleBlur}
                  autoComplete="off"
                />
                {(() => {
                  const error = (activeFormik.errors[name] as unknown as unknown[])?.[itemIndex];
                  const isTouched = (activeFormik.touched[name] as unknown as unknown[])?.[itemIndex];
                  return isTouched && error ? (
                    <small
                      data-testid={`${formatString(name)}-error`}
                      className="d-flex text-danger mt-1 text-12"
                    >
                      {String(error)}
                    </small>
                  ) : null;
                })()}
              </div>
              {arrayValue.length !== 1 && (
                <div>
                  {IconButton && DeleteIcon ? (
                    <IconButton
                      size="small"
                      data-testid={`${formatString(name)}-del-btn`}
                      onClick={() => deleteRow(itemIndex)}
                    >
                      <IconRenderer Icon={DeleteIcon} size={20} className="text-danger" />
                    </IconButton>
                  ) : (
                    <button
                      type="button"
                      data-testid={`${formatString(name)}-del-btn`}
                      onClick={() => deleteRow(itemIndex)}
                    >
                      ×
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
          {isButtonVisible && (
            <div>
              <Button
                variant="text"
                className="text-primary text-capitalize text-start"
                startIcon={AddIcon ? <IconRenderer Icon={AddIcon} size={16} /> : '+'}
                data-testid={`${formatString(name)}-add-btn`}
                onClick={addRow}
              >
                {buttonLabel || t('COMMON:add')}
              </Button>
            </div>
          )}
        </>
      )}
    </FieldWrapper>
  );
};

