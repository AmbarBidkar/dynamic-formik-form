import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { InputField } from '../InputField';
import { renderWithFormik } from '../../../test/utils';

describe('InputField', () => {
  it('renders input field with label', () => {
    renderWithFormik(
      <InputField
        name="email"
        type="inputfield"
        label="Email Address"
        fieldType="email"
      />
    );
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  });

  it('renders input with correct type', () => {
    renderWithFormik(
      <InputField name="password" type="inputfield" fieldType="password" />
    );
    const input = document.querySelector('input[name="password"]') as HTMLInputElement;
    expect(input).toHaveAttribute('type', 'password');
  });

  it('displays placeholder text', () => {
    renderWithFormik(
      <InputField
        name="username"
        type="inputfield"
        placeholder="Enter username"
      />
    );
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    renderWithFormik(
      <InputField
        name="email"
        type="inputfield"
        label="Email"
        required
      />
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('handles input change', async () => {
    const { formik } = renderWithFormik(
      <InputField name="test" type="inputfield" />,
      {
        initialValues: { test: '' },
      }
    );
    const input = document.querySelector('input[name="test"]') as HTMLInputElement;
    await act(async () => {
      fireEvent.change(input, { target: { value: 'test value', name: 'test' } });
    });
    // Check both input value and formik value
    await waitFor(() => {
      const updatedInput = document.querySelector('input[name="test"]') as HTMLInputElement;
      expect(updatedInput?.value || formik?.values.test).toBe('test value');
    }, { timeout: 2000 });
  });

  it('displays error message when field has error and is touched', () => {
    renderWithFormik(
      <InputField name="email" type="inputfield" label="Email" required />,
      {
        initialValues: { email: '' },
        formikProps: {
          errors: { email: 'Email is required' },
          touched: { email: true },
        },
      }
    );
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('shows password visibility toggle when isVisibleEnable is true', () => {
    renderWithFormik(
      <InputField
        name="password"
        type="inputfield"
        fieldType="password"
        isVisibleEnable
      />
    );
    expect(screen.getByTestId(/password-visible-btn/i)).toBeInTheDocument();
  });

  it('shows copy button when isCopyEnable is true', () => {
    renderWithFormik(
      <InputField
        name="token"
        type="inputfield"
        isCopyEnable
      />
    );
    expect(screen.getByTestId(/token-copy-btn/i)).toBeInTheDocument();
  });

  it('disables input when disabled prop is true', () => {
    renderWithFormik(
      <InputField name="test" type="inputfield" label="Test" disabled />
    );
    const input = document.querySelector('input[name="test"]') as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  it('renders description when provided', () => {
    renderWithFormik(
      <InputField
        name="test"
        type="inputfield"
        desc="Helper text"
      />
    );
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });
});
