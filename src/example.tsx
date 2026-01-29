/**
 * Example usage of DynamicForm
 * 
 * This file demonstrates how to use the DynamicForm component.
 * It is NOT part of the build output (excluded in tsconfig.build.json).
 * 
 * TODO: Replace with actual implementation examples once DynamicForm is complete
 */

import { DynamicForm } from './components/DynamicForm';
import { FieldConfig } from './types/field.types';
import * as Yup from 'yup';

// Example field configuration
const exampleFields: FieldConfig[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email Address',
    placeholder: 'Enter your email',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
  },
  // TODO: Add more field examples (select, checkbox, textarea, etc.)
];

// Example validation schema
const exampleValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

// Example usage
export const exampleUsage = () => {
  const handleSubmit = async (values: Record<string, unknown>) => {
    console.log('Form submitted with values:', values);
    // TODO: Add actual submission logic
  };

  return (
    <DynamicForm
      fields={exampleFields}
      initialValues={{ email: '', password: '' }}
      validationSchema={exampleValidationSchema}
      onSubmit={handleSubmit}
    />
  );
};

