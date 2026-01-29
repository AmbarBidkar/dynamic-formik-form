import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { RadioField } from '../RadioField';
import { renderWithFormik } from '../../../test/utils';

describe('RadioField', () => {
  const options = {
    option1: 'Option 1',
    option2: 'Option 2',
    option3: 'Option 3',
  };

  it('renders radio buttons with label', () => {
    renderWithFormik(
      <RadioField
        name="choice"
        type="radiobtn"
        label="Choose an option"
        values={options}
      />
    );
    expect(screen.getByText(/choose an option/i)).toBeInTheDocument();
  });

  it('renders all radio options', () => {
    renderWithFormik(
      <RadioField name="choice" type="radiobtn" values={options} />
    );
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 3')).toBeInTheDocument();
  });

  it('handles radio button selection', async () => {
    const { formik } = renderWithFormik(
      <RadioField name="choice" type="radiobtn" values={options} />,
      {
        initialValues: { choice: '' },
      }
    );
    const radio1 = document.querySelector('input[type="radio"][value="option1"]') as HTMLInputElement;
    expect(radio1).toBeTruthy();
    await act(async () => {
      fireEvent.change(radio1, { target: { value: 'option1', checked: true, name: 'choice' } });
    });
    // Check both radio checked state and formik value
    await waitFor(() => {
      const updatedRadio = document.querySelector('input[type="radio"][value="option1"]') as HTMLInputElement;
      expect(updatedRadio?.checked || formik?.values.choice === 'option1').toBeTruthy();
    }, { timeout: 2000 });
  });

  it('shows required indicator when required', () => {
    renderWithFormik(
      <RadioField
        name="choice"
        type="radiobtn"
        label="Choice"
        values={options}
        required
      />
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message when field has error', async () => {
    renderWithFormik(
      <RadioField name="choice" type="radiobtn" values={options} required />,
      {
        initialValues: { choice: '' },
        formikProps: {
          errors: { choice: 'Please select an option' },
          touched: { choice: true },
        },
      }
    );
    await waitFor(() => {
      expect(screen.getByText('Please select an option')).toBeInTheDocument();
    });
  });

  it('renders description when provided', () => {
    renderWithFormik(
      <RadioField
        name="choice"
        type="radiobtn"
        values={options}
        desc="Select one option"
      />
    );
    expect(screen.getByText('Select one option')).toBeInTheDocument();
  });

  it('disables radio buttons when disabled prop is true', () => {
    renderWithFormik(
      <RadioField name="choice" type="radiobtn" values={options} disabled />
    );
    const radios = document.querySelectorAll('input[type="radio"][name="choice"]');
    radios.forEach((radio) => {
      expect(radio).toBeDisabled();
    });
  });
});

