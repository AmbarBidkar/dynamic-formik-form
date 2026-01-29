import React from 'react';
import { render } from '@testing-library/react';
import { Formik, FormikProps } from 'formik';
import { FormProvider } from '../context/FormContext';
import { UILibraryConfig } from '../types/ui-library.types';
import { defaultAdapter } from '../adapters';
import { defaultIcons } from '../icons/default.icons';

/**
 * Test utilities for DynamicForm components
 */

interface RenderWithFormikOptions {
  initialValues?: Record<string, unknown>;
  uiLibrary?: UILibraryConfig;
  formikProps?: Partial<FormikProps<Record<string, unknown>>>;
}

/**
 * Render a component wrapped with Formik and FormProvider
 */
export const renderWithFormik = (
  component: React.ReactElement,
  options: RenderWithFormikOptions = {}
) => {
  const {
    initialValues = {},
    uiLibrary = {
      adapter: defaultAdapter,
      icons: defaultIcons,
      name: 'default',
    },
    formikProps = {},
  } = options;

  let formikInstance: FormikProps<Record<string, unknown>> | null = null;

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={() => {}}
        {...formikProps}
      >
        {(formik) => {
          formikInstance = formik;
          // Apply errors and touched from formikProps if provided
          if (formikProps.errors) {
            Object.assign(formik.errors, formikProps.errors);
          }
          if (formikProps.touched) {
            Object.assign(formik.touched, formikProps.touched);
          }
          return (
            <FormProvider uiLibrary={uiLibrary} formik={formik}>
              {children}
            </FormProvider>
          );
        }}
      </Formik>
    );
  };

  const result = render(component, { wrapper: Wrapper });

  return {
    ...result,
    formik: formikInstance,
  };
};

/**
 * Create mock UI library adapter for testing
 */
export const createMockAdapter = (overrides?: Partial<UILibraryConfig['adapter']>) => {
  return {
    ...defaultAdapter,
    ...overrides,
  };
};

/**
 * Create mock icon library for testing
 */
export const createMockIcons = (overrides?: Partial<UILibraryConfig['icons']>) => {
  return {
    ...defaultIcons,
    ...overrides,
  };
};

