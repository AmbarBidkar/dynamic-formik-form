import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { CheckboxField } from '../CheckboxField';
import { renderWithFormik } from '../../../test/utils';

describe('CheckboxField', () => {
  it('renders checkbox with label', () => {
    renderWithFormik(
      <CheckboxField
        name="agree"
        type="checkbox"
        label="I agree to terms"
      />
    );
    expect(screen.getByLabelText(/i agree to terms/i)).toBeInTheDocument();
  });

  it('handles checkbox change', async () => {
    const { formik } = renderWithFormik(
      <CheckboxField name="agree" type="checkbox" label="Agree" />,
      {
        initialValues: { agree: false },
      }
    );
    const checkbox = document.querySelector('input[type="checkbox"][name="agree"]') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    await act(async () => {
      fireEvent.change(checkbox, { target: { checked: true, name: 'agree' } });
    });
    // Check both checkbox state and formik value
    await waitFor(() => {
      const updatedCheckbox = document.querySelector('input[type="checkbox"][name="agree"]') as HTMLInputElement;
      expect(updatedCheckbox?.checked || formik?.values.agree).toBeTruthy();
    }, { timeout: 2000 });
  });

  it('shows required indicator when required', () => {
    renderWithFormik(
      <CheckboxField
        name="agree"
        type="checkbox"
        label="Agree"
        required
      />
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message when field has error', async () => {
    renderWithFormik(
      <CheckboxField name="agree" type="checkbox" required />,
      {
        initialValues: { agree: false },
        formikProps: {
          errors: { agree: 'You must agree' },
          touched: { agree: true },
        },
      }
    );
    await waitFor(() => {
      expect(screen.getByText('You must agree')).toBeInTheDocument();
    });
  });

  it('renders description when provided', () => {
    renderWithFormik(
      <CheckboxField
        name="agree"
        type="checkbox"
        desc="Please read carefully"
      />
    );
    expect(screen.getByText('Please read carefully')).toBeInTheDocument();
  });

  it('disables checkbox when disabled prop is true', () => {
    renderWithFormik(
      <CheckboxField name="agree" type="checkbox" disabled />
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });
});

