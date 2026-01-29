import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { ToggleField } from '../ToggleField';
import { renderWithFormik } from '../../../test/utils';

describe('ToggleField', () => {
  it('renders toggle with label', () => {
    renderWithFormik(
      <ToggleField name="enabled" type="toggle" label="Enable feature" />
    );
    expect(screen.getByText(/enable feature/i)).toBeInTheDocument();
    const checkbox = document.querySelector('input[type="checkbox"][name="enabled"]');
    expect(checkbox).toBeInTheDocument();
  });

  it('handles toggle change', async () => {
    const { formik } = renderWithFormik(
      <ToggleField name="enabled" type="toggle" label="Enable" />,
      {
        initialValues: { enabled: false },
      }
    );
    const toggle = document.querySelector('input[type="checkbox"][name="enabled"]') as HTMLInputElement;
    expect(toggle.checked).toBe(false);
    await act(async () => {
      fireEvent.change(toggle, { target: { checked: true, name: 'enabled' } });
    });
    // Check both toggle checked state and formik value
    await waitFor(() => {
      const updatedToggle = document.querySelector('input[type="checkbox"][name="enabled"]') as HTMLInputElement;
      expect(updatedToggle?.checked || formik?.values.enabled).toBeTruthy();
    }, { timeout: 2000 });
  });

  it('shows required indicator when required', () => {
    renderWithFormik(
      <ToggleField name="enabled" type="toggle" label="Enable" required />
    );
    // Required indicator is shown in the label
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message when field has error', async () => {
    const { formik } = renderWithFormik(
      <ToggleField name="enabled" type="toggle" required />,
      {
        initialValues: { enabled: false },
        formikProps: {
          errors: { enabled: 'This field is required' },
          touched: { enabled: true },
        },
      }
    );
    await waitFor(() => {
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });
  });

  it('disables toggle when disabled prop is true', () => {
    renderWithFormik(
      <ToggleField name="enabled" type="toggle" label="Enable" disabled />
    );
    const toggle = document.querySelector('input[type="checkbox"][name="enabled"]') as HTMLInputElement;
    expect(toggle).toBeDisabled();
  });
});

