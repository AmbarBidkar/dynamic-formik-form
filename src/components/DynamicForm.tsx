import React, { useState, useEffect, useCallback } from 'react';
import { FormikProps } from 'formik';
import { DynamicFormProps, FieldConfig } from '../types/field.types';
import { FormProvider } from '../context/FormContext';
import { defaultAdapter } from '../adapters';
import { defaultIcons } from '../icons/default.icons';
import { getFieldValue, getNestedProperty } from '../utils/formik.utils';

// Import all field components
import { EmptyField } from './fields/EmptyField';
import { TextField } from './fields/TextField';
import { LinkField } from './fields/LinkField';
import { ComponentField } from './fields/ComponentField';
import { CustomField } from './fields/CustomField';
import { InputField } from './fields/InputField';
import { TextareaField } from './fields/TextareaField';
import { CheckboxField } from './fields/CheckboxField';
import { RadioField } from './fields/RadioField';
import { DropdownField } from './fields/DropdownField';
import { ToggleField } from './fields/ToggleField';
import { FileUploadField } from './fields/FileUploadField';
import { SingleSelectField } from './fields/SingleSelectField';
import { MultiSelectField } from './fields/MultiSelectField';
import { AsyncSelectField } from './fields/AsyncSelectField';
import { DatePickerField } from './fields/DatePickerField';
import { DateTimePickerField } from './fields/DateTimePickerField';
import { DeleteField } from './fields/DeleteField';
import { CounterField } from './fields/CounterField';
import { FieldArrayField } from './fields/FieldArrayField';
import { AttributeField } from './fields/AttributeField';
import { EditableDivField } from './fields/EditableDivField';

/**
 * Field component mapping
 * Maps field types to their corresponding components
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FIELD_COMPONENT_MAP: Record<string, React.ComponentType<any>> = {
  emptyField: EmptyField,
  text: TextField,
  link: LinkField,
  component: ComponentField,
  custom: CustomField,
  inputfield: InputField,
  textarea: TextareaField,
  checkbox: CheckboxField,
  radiobtn: RadioField,
  dropdown: DropdownField,
  toggle: ToggleField,
  fileupload: FileUploadField,
  singleSelect: SingleSelectField,
  multiSelect: MultiSelectField,
  asyncSelect: AsyncSelectField,
  datePicker: DatePickerField,
  dateTimePicker: DateTimePickerField,
  delete: DeleteField,
  counter: CounterField,
  fieldArray: FieldArrayField,
  attribute: AttributeField,
  editablediv: EditableDivField,
};

/**
 * DynamicForm Component
 * 
 * Orchestrator component that renders fields dynamically based on configuration.
 * Supports conditional field rendering, child fields, and all production features.
 */
export const DynamicForm = <T extends Record<string, unknown>>({
  fields,
  formik,
  firstInitialValues,
  fieldCount,
  attributeFields,
  customFormChange,
  RadiusTab = false,
  uiLibrary,
}: DynamicFormProps<T> & {
  formik: FormikProps<T>;
  uiLibrary?: {
    adapter: typeof defaultAdapter;
    icons?: typeof defaultIcons;
    name: string;
  };
}) => {
  const [formFields, setFormFields] = useState<FieldConfig[]>([]);

  // Use provided UI library or default
  const activeUILibrary = uiLibrary || {
    adapter: defaultAdapter,
    icons: defaultIcons,
    name: 'default',
  };

  // Filter out false values (conditional fields)
  useEffect(() => {
    const newFormFields = fields?.filter((item) => item !== false) as FieldConfig[];
    setFormFields(newFormFields);
  }, [fields]);

  /**
   * Recursively set field values for child fields
   */
  const setFieldValuesRecursive = useCallback(
    (child: FieldConfig[] | undefined, parentValue: string | null = null) => {
      if (!child) return;

      child.forEach((c) => {
        if (RadiusTab) {
          if (!c.hidden || parentValue === c.hiddenlabel) {
            // Check if field has values property (for select fields)
            const hasValues = 'values' in c && c.values;
            const fieldValue =
              hasValues && typeof c.values === 'object' && !Array.isArray(c.values) && Object.keys(c.values).length > 0
                ? Object.keys(c.values as Record<string, unknown>)[0]
                : firstInitialValues
                ? getNestedProperty(firstInitialValues as Record<string, unknown>, c.name)
                : '';

            formik.setFieldValue(c.name, fieldValue);
          }
        } else {
          const value = firstInitialValues
            ? getNestedProperty(firstInitialValues as Record<string, unknown>, c.name)
            : undefined;
          formik.setFieldValue(c.name, value === undefined ? '' : value);
          formik.setFieldTouched(c.name, false);
        }

        if (c.child) {
          setFieldValuesRecursive(c.child, parentValue);
        }
      });
    },
    [formik, firstInitialValues, RadiusTab]
  );

  /**
   * Render a single field component
   */
  const renderField = (
    field: FieldConfig,
    index: number | string,
    isChild = false
  ): React.ReactNode => {
    if (!field) return null;

    // Check if field should be hidden
    if (field.shouldHide && field.shouldHide({ 
      formik: formik as FormikProps<Record<string, unknown>>, 
      name: field.name, 
      index: typeof index === 'number' ? index : undefined 
    })) {
      return null;
    }

    // Get the component for this field type
    const FieldComponent = FIELD_COMPONENT_MAP[field.type];
    if (!FieldComponent) {
      console.warn(`Unknown field type: ${field.type}`);
      return null;
    }

    // Prepare props for the field component
    const fieldProps = {
      ...field,
      formik,
      index,
      isChild,
      setFieldValuesRecursive,
      customFormChange,
    };

    // Render the field component
    const fieldElement = <FieldComponent key={`${field.name}-${index}`} {...fieldProps} />;

    // Handle child fields for conditional rendering
    if (field.child && field.child.length > 0) {
      const fieldValue = getFieldValue(formik, field.name);
      const valuePath = getNestedProperty(formik.values, field.name);

      return (
        <React.Fragment key={`${field.name}-${index}`}>
          {fieldElement}
          {field.child.map((childField, childIndex) => {
            // Check if child should be shown based on hiddenlabel or targetType
            const shouldShowChild =
              fieldValue === childField.hiddenlabel ||
              valuePath === childField.hiddenlabel ||
              (field.type === 'checkbox' && fieldValue) ||
              (field.type === 'radiobtn' &&
                (fieldValue === childField.targetType || 
                 String(fieldValue) === String(childField.targetType))) ||
              (field.type === 'attribute' && true); // Attribute children are always shown

            if (shouldShowChild) {
              return renderField(
                childField,
                `child-${childField.name}-${childIndex}`,
                true
              );
            }
            return null;
          })}
        </React.Fragment>
      );
    }

    // AttributeField handles its own properties rendering internally
    // No need to render properties here as AttributeField component does it

    return fieldElement;
  };

  /**
   * Group fields into rows (for attributeFields layout)
   */
  const groupFormFieldsIntoRows = () => {
    if (!fieldCount) return [];
    const rows = [];
    for (let i = 0; i < fieldCount; i += 1) {
      const startIdx = i * 3;
      const endIdx = startIdx + 3;
      const rowFields = formFields.slice(startIdx, endIdx);
      rows.push(rowFields);
    }
    return rows;
  };

  // Render fields
  if (attributeFields !== undefined) {
    // Grouped layout for attribute fields
    return (
      <FormProvider uiLibrary={activeUILibrary} formik={formik as FormikProps<Record<string, unknown>>}>
        <div className="row">
          {groupFormFieldsIntoRows().map((rowFields, rowIndex) => (
            <div key={rowIndex} className="row">
              {rowFields.map((fieldValue, index) => {
                const uniqueKey = `${fieldValue?.label || fieldValue?.name}-${index}`;
                return (
                  <React.Fragment key={uniqueKey}>
                    {renderField(fieldValue, uniqueKey)}
                  </React.Fragment>
                );
              })}
            </div>
          ))}
        </div>
      </FormProvider>
    );
  }

  // Standard layout
  return (
    <FormProvider uiLibrary={activeUILibrary} formik={formik as FormikProps<Record<string, unknown>>}>
      <div className="row mx-0">
        {formFields.map((fieldValue, index) => {
          const uniqueKey = `${fieldValue?.label || fieldValue?.name}-${index}`;
          return renderField(fieldValue, uniqueKey);
        })}
      </div>
    </FormProvider>
  );
};
