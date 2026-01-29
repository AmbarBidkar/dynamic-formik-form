// Main entry point for the package
// Export all public APIs here

export { DynamicForm } from './components/DynamicForm';
export type { 
  FieldConfig, 
  DynamicFormProps,
  DynamicFormPropsWithFormik,
  FieldType,
  BaseFieldConfig,
  InputFieldConfig,
  SelectFieldConfig,
  CheckboxFieldConfig,
  RadioFieldConfig,
  TextareaFieldConfig,
  FileUploadFieldConfig,
  DatePickerFieldConfig,
  FieldArrayConfig,
  AttributeFieldConfig,
  EditableDivFieldConfig,
  CounterFieldConfig,
} from './types/field.types';

// Export UI library types and adapters
export type { UILibraryAdapter, IconLibrary, UILibraryConfig } from './types/ui-library.types';
export { defaultAdapter, createMUIAdapter, createBootstrapAdapter, createAntDesignAdapter } from './adapters';
export { defaultIcons, createMUIIcons, createBootstrapIcons, createAntDesignIcons } from './icons';

// Export shared components (for advanced usage)
export { FieldLabel, FieldDescription, FieldError, FieldWrapper } from './components/shared';

// Export field components (for advanced usage)
export {
  EmptyField,
  TextField,
  LinkField,
  ComponentField,
  CustomField,
  InputField,
  TextareaField,
  CheckboxField,
  RadioField,
  DropdownField,
  ToggleField,
  FileUploadField,
  SingleSelectField,
  MultiSelectField,
  AsyncSelectField,
  DatePickerField,
  DateTimePickerField,
  DeleteField,
  CounterField,
  FieldArrayField,
  AttributeField,
  EditableDivField,
} from './components/fields';

// Export utilities (for advanced usage)
export {
  getNestedProperty,
  getNestedValueNew,
  getFieldValue,
  getFieldError,
  getFieldTouched,
} from './utils/formik.utils';

export {
  formatString,
  camelToKebabCase,
  sanitizeLabelForCSS,
  isBlank,
  isNotBlank,
} from './utils/field.utils';

export {
  validateEmail,
  isValidUrl,
  checkValidUsername,
} from './utils/validation.utils';

// Export context (for advanced usage)
export { FormProvider, useFormContext } from './context/FormContext';

