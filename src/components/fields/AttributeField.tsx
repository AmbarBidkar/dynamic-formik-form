import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { getNestedValueNew, getNestedProperty, getFieldValue } from '../../utils/formik.utils';
import { FieldWrapper } from '../shared/FieldWrapper';
import { FieldLabel } from '../shared/FieldLabel';
import { FieldDescription } from '../shared/FieldDescription';
import { IconRenderer } from '../shared/IconRenderer';
import { formatString } from '../../utils/field.utils';
import { AttributeFieldConfig, FieldConfig } from '../../types/field.types';
import { useTranslation } from '../../hooks/useTranslation';

// Import field components for rendering properties
import { InputField } from './InputField';
import { DropdownField } from './DropdownField';
import { CheckboxField } from './CheckboxField';
import { RadioField } from './RadioField';
import { TextareaField } from './TextareaField';
import { FileUploadField } from './FileUploadField';
import { MultiSelectField } from './MultiSelectField';
import { SingleSelectField } from './SingleSelectField';
import { ComponentField } from './ComponentField';
import { LinkField } from './LinkField';

/**
 * Field component mapping for AttributeField properties
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PROPERTY_FIELD_MAP: Record<string, React.ComponentType<any>> = {
  inputfield: InputField,
  dropdown: DropdownField,
  checkbox: CheckboxField,
  radiobtn: RadioField,
  textarea: TextareaField,
  fileupload: FileUploadField,
  multiSelect: MultiSelectField,
  singleSelect: SingleSelectField,
  component: ComponentField,
  link: LinkField,
};

/**
 * AttributeField Component
 * Renders complex nested attribute mapping fields
 */
export const AttributeField: React.FC<AttributeFieldConfig & {
  setFieldValuesRecursive?: (child: FieldConfig[], parentValue?: string) => void;
  customFormChange?: (event: any, type: string) => void;
}> = ({
  name,
  type,
  label,
  desc,
  required,
  customClass,
  customAttrClass,
  showIllustration = true,
  showAddNewFieldBtn = true,
  addNewFieldBtnLabel,
  properties = [],
  addNewField = {},
  component,
  formik: formikProp,
  minimumValuePresent = false,
  index,
  setFieldValuesRecursive,
  customFormChange,
}) => {
  const { uiLibrary, formik } = useFormContext();
  const { adapter, icons } = uiLibrary;
  const Button = adapter.Button;
  const IconButton = adapter.IconButton;
  const activeFormik = formikProp || formik;
  const { t } = useTranslation();

  const AddIcon = icons?.Add;
  const DeleteIcon = icons?.Delete;

  const attributeValues = getNestedValueNew(activeFormik.values, name);
  const attributeValuesAlt = getNestedProperty(activeFormik.values, name);
  const valuesArray = Array.isArray(attributeValues)
    ? attributeValues
    : Array.isArray(attributeValuesAlt)
    ? attributeValuesAlt
    : [];

  const deleteRow = (indexToDelete: number) => {
    const currentValues = getNestedProperty(activeFormik.values, name);
    const valuesArray = Array.isArray(currentValues) ? currentValues : [];
    const updatedArray = valuesArray.filter((_, i) => i !== indexToDelete);
    activeFormik.setFieldValue(name, updatedArray);
  };

  const addNewAttribute = () => {
    const currentValues = getNestedProperty(activeFormik.values, name);
    const valuesArray = Array.isArray(currentValues) ? currentValues : [];
    activeFormik.setFieldValue(name, [...valuesArray, addNewField]);
  };

  const hasNoAttributes =
    valuesArray.length === 0 ||
    (typeof valuesArray === 'object' && Object.keys(valuesArray).length === 0);

  /**
   * Render a property field within AttributeField
   */
  const renderPropertyField = (property: FieldConfig, propIndex: number) => {
    const PropertyComponent = PROPERTY_FIELD_MAP[property.type];
    if (!PropertyComponent) {
      console.warn(`Unknown property type in AttributeField: ${property.type}`);
      return null;
    }

    const propertyProps = {
      ...property,
      formik: activeFormik,
      index: propIndex,
      setFieldValuesRecursive,
      customFormChange,
    };

    return <PropertyComponent key={propIndex} {...propertyProps} />;
  };

  return (
    <FieldWrapper customClass={customClass} index={index}>
      {label && (
        <FieldLabel
          name={name}
          label={label}
          required={required}
        />
      )}
      {desc && <FieldDescription desc={desc} />}
      {component && <div className="mt-3">{component}</div>}

      {showIllustration && hasNoAttributes ? (
        <div className="d-flex flex-column justify-content-center align-items-center gap-4 pt-4">
          {/* Placeholder for illustration image */}
          <div
            data-testid="no-attr-img"
            style={{
              width: '200px',
              height: '200px',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            No Image
          </div>
          <h6 data-testid="no-attr-text" className="mb-4">
            {t('COMMON:attribute_mapping.no_attributes_added')}
          </h6>
        </div>
      ) : (
        valuesArray.map((item: Record<string, unknown>, itemIndex: number) => {
          // Transform properties with nested names
          const transformedProperties = properties.map((property) => ({
            ...property,
            name: `${name}[${itemIndex}].${property.name}`,
            child: property.child?.map((childItem) => ({
              ...childItem,
              name: `${name}[${itemIndex}].${childItem.name}`,
            })),
          }));

          return (
            <div
              key={itemIndex}
              className={customAttrClass || 'd-flex flex-row gap-3 mb-3'}
            >
              {/* Render properties as fields */}
              {transformedProperties.map((property, propIndex) => {
                return (
                  <React.Fragment key={propIndex}>
                    {renderPropertyField(property, propIndex)}
                  </React.Fragment>
                );
              })}

              {(minimumValuePresent
                ? valuesArray.length > 1
                : true) && (
                <div className="col-1 mt-4 pt-1">
                  <div className={minimumValuePresent ? 'mt-0' : ''}>
                    {IconButton && DeleteIcon ? (
                      <IconButton
                        size="small"
                        onClick={() => deleteRow(itemIndex)}
                        data-testid={`${formatString(name)}-delete-icon`}
                      >
                        <IconRenderer Icon={DeleteIcon} size={20} className="text-danger" />
                      </IconButton>
                    ) : (
                      <button
                        type="button"
                        onClick={() => deleteRow(itemIndex)}
                        data-testid={`${formatString(name)}-delete-icon`}
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}

      {showAddNewFieldBtn && (
        <div
          className={
            valuesArray.length
              ? ''
              : `d-flex ${
                  showIllustration
                    ? 'justify-content-center'
                    : 'justify-content-start'
                } align-items-center`
          }
        >
          <Button
            variant="text"
            className="text-primary text-capitalize text-start"
            startIcon={AddIcon ? <IconRenderer Icon={AddIcon} size={16} /> : '+'}
            data-testid="add-attr-btn"
            onClick={addNewAttribute}
          >
            {addNewFieldBtnLabel ?? 'Add'}
          </Button>
        </div>
      )}
    </FieldWrapper>
  );
};
