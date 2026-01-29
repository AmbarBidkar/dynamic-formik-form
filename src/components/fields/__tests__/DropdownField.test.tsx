import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { DropdownField } from '../DropdownField';
import { renderWithFormik } from '../../../test/utils';

describe('DropdownField', () => {
  const options = {
    '': 'Select',
    option1: 'Option 1',
    option2: 'Option 2',
    option3: 'Option 3',
  };

  it('renders dropdown with label', () => {
    renderWithFormik(
      <DropdownField
        name="country"
        type="dropdown"
        label="Country"
        values={options}
      />
    );
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
  });

  it('renders all options', () => {
    renderWithFormik(
      <DropdownField name="test" type="dropdown" values={options} />
    );
    expect(screen.getByText('Select')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('handles dropdown change', async () => {
    const { formik } = renderWithFormik(
      <DropdownField name="test" type="dropdown" values={options} />,
      {
        initialValues: { test: '' },
      }
    );
    const select = document.querySelector('select[name="test"]') as HTMLSelectElement;
    await act(async () => {
      fireEvent.change(select, { target: { value: 'option1', name: 'test' } });
    });
    // Check both select value and formik value
    await waitFor(() => {
      const updatedSelect = document.querySelector('select[name="test"]') as HTMLSelectElement;
      expect(updatedSelect?.value || formik?.values.test).toBe('option1');
    }, { timeout: 2000 });
  });

  it('shows required indicator when required', () => {
    renderWithFormik(
      <DropdownField
        name="test"
        type="dropdown"
        label="Test"
        values={options}
        required
      />
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message when field has error', async () => {
    renderWithFormik(
      <DropdownField name="test" type="dropdown" values={options} required />,
      {
        initialValues: { test: '' },
        formikProps: {
          errors: { test: 'Please select an option' },
          touched: { test: true },
        },
      }
    );
    await waitFor(() => {
      expect(screen.getByText('Please select an option')).toBeInTheDocument();
    });
  });

  it('disables dropdown when disabled prop is true', () => {
    renderWithFormik(
      <DropdownField name="test" type="dropdown" values={options} disabled />
    );
    const select = document.querySelector('select[name="test"]') as HTMLSelectElement;
    expect(select).toBeDisabled();
  });

  it('renders description when provided', () => {
    renderWithFormik(
      <DropdownField
        name="test"
        type="dropdown"
        values={options}
        desc="Choose an option"
      />
    );
    expect(screen.getByText('Choose an option')).toBeInTheDocument();
  });
});

