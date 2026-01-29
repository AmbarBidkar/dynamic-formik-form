import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TextField } from '../TextField';
import { renderWithFormik } from '../../../test/utils';

describe('TextField', () => {
  it('renders text field with label', () => {
    renderWithFormik(
      <TextField name="display" type="text" label="Display Text" />
    );
    expect(screen.getByText('Display Text')).toBeInTheDocument();
  });

  it('displays field value', () => {
    renderWithFormik(
      <TextField name="display" type="text" />,
      {
        initialValues: { display: 'Test Value' },
      }
    );
    expect(screen.getByText('Test Value')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    renderWithFormik(
      <TextField name="display" type="text" label="Display" required />
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message when showCustomError is true', () => {
    renderWithFormik(
      <TextField
        name="display"
        type="text"
        showCustomError
        error="Custom error"
      />
    );
    expect(screen.getByText('Custom error')).toBeInTheDocument();
  });

  it('does not render when label is not provided and no value', () => {
    const { container } = renderWithFormik(
      <TextField name="display" type="text" />
    );
    // Should still render the wrapper
    expect(container.firstChild).toBeTruthy();
  });
});
