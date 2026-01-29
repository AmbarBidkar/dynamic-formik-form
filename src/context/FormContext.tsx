import React, { createContext, useContext, ReactNode } from 'react';
import { FormikProps } from 'formik';
import { UILibraryConfig } from '../types/ui-library.types';

/**
 * Form context that provides:
 * - UI library adapter
 * - Icon library
 * - Formik instance
 */
interface FormContextValue {
  uiLibrary: UILibraryConfig;
  formik: FormikProps<Record<string, unknown>>;
}

const FormContext = createContext<FormContextValue | null>(null);

interface FormProviderProps {
  children: ReactNode;
  uiLibrary: UILibraryConfig;
  formik: FormikProps<Record<string, unknown>>;
}

export const FormProvider: React.FC<FormProviderProps> = ({
  children,
  uiLibrary,
  formik,
}) => {
  return (
    <FormContext.Provider value={{ uiLibrary, formik }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = (): FormContextValue => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider');
  }
  return context;
};

