import { FormikValues, FormikProps } from 'formik';
import { ObjectSchema } from 'yup';
import { ReactNode } from 'react';
import { IconLibrary } from './ui-library.types';

/**
 * Field type definitions matching production code
 */
export type FieldType =
  | 'inputfield'
  | 'editablediv'
  | 'multiSelect'
  | 'singleSelect'
  | 'asyncSelect'
  | 'fieldArray'
  | 'emptyField'
  | 'attribute'
  | 'toggle'
  | 'component'
  | 'link'
  | 'radiobtn'
  | 'textarea'
  | 'checkbox'
  | 'text'
  | 'fileupload'
  | 'dropdown'
  | 'delete'
  | 'dateTimePicker'
  | 'counter'
  | 'custom'
  | 'datePicker';

/**
 * Base field configuration shared by all field types
 */
export interface BaseFieldConfig {
  name: string;
  type: FieldType;
  label?: string;
  placeholder?: string;
  desc?: string;
  info?: string;
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  readonly?: boolean;
  customClass?: string;
  customLabelClass?: string;
  customComponentClass?: string;
  customDescClass?: string;
  customAttrClass?: string;
  dataTestId?: string;
  noIndent?: boolean;
  showOptional?: boolean;
  isButtonVisible?: boolean;
  showCustomError?: boolean;
  shouldHide?: (params: {
    formik: FormikProps<Record<string, unknown>>;
    name: string;
    index?: number;
  }) => boolean;
  // Child fields for conditional rendering
  child?: FieldConfig[];
  // Conditional rendering properties
  hiddenlabel?: string; // Value that triggers child field visibility
  targetType?: string; // For radio buttons - value that triggers child visibility
  // Custom components
  component?: ReactNode;
  blockComponent?: ReactNode;
  // Custom handlers
  customHandleChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    type: string,
    index?: number
  ) => void;
  customFormChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    type: string
  ) => void;
  onBlur?: (e: React.FocusEvent) => void;
  onClickLink?: () => void;
  // Field visibility/enable flags
  isVisibleEnable?: boolean;
  isCopyEnable?: boolean;
  // Icon customization
  customIcon?: ReactNode;
  // Ref forwarding
  ref?: React.Ref<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  // Runtime props (added by DynamicForm orchestrator)
  formik?: FormikProps<Record<string, unknown>>;
  index?: number | string;
  isChild?: boolean;
  setFieldValuesRecursive?: (child: FieldConfig[], parentValue?: string) => void;
}

/**
 * Input field specific configuration
 */
export interface InputFieldConfig extends BaseFieldConfig {
  type: 'inputfield';
  fieldType?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  autocomplete?: string;
  min?: number;
  max?: number;
  suffix?: string;
  ignoreChar?: boolean;
}

/**
 * Select field specific configuration
 */
export interface SelectFieldConfig extends BaseFieldConfig {
  type: 'singleSelect' | 'multiSelect' | 'asyncSelect' | 'dropdown';
  values?: Array<{ value: string | number; label: string; desc?: string }> | Record<string, string>;
  isSearchable?: boolean;
  isMulti?: boolean;
  loaderCall?: (inputValue: string) => Promise<{ apps: unknown[]; error?: string }>;
  headerKey?: string;
  optionsLabel?: boolean;
  disabledDropdownOption?: boolean;
  disabledOptionText?: string;
  searchField?: string;
  resetChild?: boolean;
  ignoreChar?: boolean; // For dropdown field
}

/**
 * Checkbox field configuration
 */
export interface CheckboxFieldConfig extends BaseFieldConfig {
  type: 'checkbox';
  values?: Record<string, string>;
}

/**
 * Radio field configuration
 */
export interface RadioFieldConfig extends BaseFieldConfig {
  type: 'radiobtn';
  values?: Record<string, string>;
}

/**
 * Textarea field configuration
 */
export interface TextareaFieldConfig extends BaseFieldConfig {
  type: 'textarea';
  rows?: number;
}

/**
 * File upload field configuration
 */
export interface FileUploadFieldConfig extends BaseFieldConfig {
  type: 'fileupload';
}

/**
 * Date picker field configuration
 */
export interface DatePickerFieldConfig extends BaseFieldConfig {
  type: 'datePicker' | 'dateTimePicker';
  dateFormat?: string;
  disablePast?: boolean;
  views?: string[];
}

/**
 * Field array configuration
 */
export interface FieldArrayConfig extends BaseFieldConfig {
  type: 'fieldArray';
  properties?: {
    isKeyValue?: boolean;
    keyPlaceholder?: string;
    valuePlaceholder?: string;
  };
  buttonLabel?: string;
  addNewFieldBtnLabel?: string;
  minimumValuePresent?: boolean;
  showAddNewFieldBtn?: boolean;
}

/**
 * Attribute field configuration
 */
export interface AttributeFieldConfig extends BaseFieldConfig {
  type: 'attribute';
  properties?: FieldConfig[];
  addNewField?: Record<string, unknown>;
  showIllustration?: boolean;
  showAddNewFieldBtn?: boolean;
  addNewFieldBtnLabel?: string;
  minimumValuePresent?: boolean;
}

/**
 * Editable div field configuration
 */
export interface EditableDivFieldConfig extends BaseFieldConfig {
  type: 'editablediv';
  availableFields?: Array<{ key: string; label: string }>;
}

/**
 * Counter field configuration
 */
export interface CounterFieldConfig extends BaseFieldConfig {
  type: 'counter';
  min?: number;
  max?: number;
  suffix?: string;
}

/**
 * Union type for all field configurations
 */
export type FieldConfig =
  | InputFieldConfig
  | SelectFieldConfig
  | CheckboxFieldConfig
  | RadioFieldConfig
  | TextareaFieldConfig
  | FileUploadFieldConfig
  | DatePickerFieldConfig
  | FieldArrayConfig
  | AttributeFieldConfig
  | EditableDivFieldConfig
  | CounterFieldConfig
  | BaseFieldConfig;

/**
 * Props for the DynamicForm component
 * 
 * NOTE: This component expects Formik to be passed as a prop (not wrapped internally)
 * This matches the production usage pattern where Formik is managed externally
 */
export interface DynamicFormProps<T extends FormikValues = FormikValues> {
  fields: (FieldConfig | false)[];
  formik: FormikProps<T>;
  // Additional props from production code
  firstInitialValues?: T;
  onUpdateFormFields?: (fields: FieldConfig[]) => void;
  fieldCount?: number;
  attributeFields?: FieldConfig[];
  handleDeleteChange?: (count: number) => void;
  customFormChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    type: string
  ) => void;
  RadiusTab?: boolean;
  value?: number; // Tab index value
  // UI Library configuration (optional, defaults to HTML)
  uiLibrary?: {
    adapter: any;
    icons?: IconLibrary;
    name: string;
  };
}

// Legacy props for backward compatibility (when Formik is wrapped internally)
export interface DynamicFormPropsWithFormik<T extends FormikValues = FormikValues> {
  fields: FieldConfig[];
  initialValues?: T;
  validationSchema?: ObjectSchema<T>;
  onSubmit: (values: T) => void | Promise<void>;
}

