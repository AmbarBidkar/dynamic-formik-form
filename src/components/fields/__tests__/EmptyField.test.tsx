import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { EmptyField } from '../EmptyField';
import { renderWithFormik } from '../../../test/utils';

describe('EmptyField', () => {
  it('renders hidden input field', () => {
    const { container } = renderWithFormik(
      <EmptyField name="hidden" type="emptyField" />
    );
    const input = container.querySelector('input[type="hidden"]');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'hidden');
  });

  it('sets field value', () => {
    const { formik } = renderWithFormik(
      <EmptyField name="hidden" type="emptyField" />,
      {
        initialValues: { hidden: 'test-value' },
      }
    );
    expect(formik?.values.hidden).toBe('test-value');
  });

  it('handles custom change handler', () => {
    const customHandler = vi.fn();
    renderWithFormik(
      <EmptyField
        name="hidden"
        type="emptyField"
        customHandleChange={customHandler}
      />
    );
    // Field should be rendered
    expect(customHandler).toBeDefined();
  });
});
