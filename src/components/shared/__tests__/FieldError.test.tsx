import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FieldError } from '../FieldError';

describe('FieldError', () => {
  it('renders error message when error and touched are true', () => {
    render(<FieldError name="test" error="This is an error" touched />);
    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });

  it('does not render when error is not provided', () => {
    const { container } = render(<FieldError name="test" touched />);
    expect(container.firstChild).toBeNull();
  });

  it('does not render when touched is false', () => {
    const { container } = render(
      <FieldError name="test" error="Error message" touched={false} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders when showCustomError is true even if touched is false', () => {
    render(
      <FieldError
        name="test"
        error="Custom error"
        touched={false}
        showCustomError
      />
    );
    expect(screen.getByText('Custom error')).toBeInTheDocument();
  });

  it('uses custom data-testid when provided', () => {
    render(
      <FieldError
        name="test"
        error="Error"
        touched
        dataTestId="custom-error-id"
      />
    );
    expect(screen.getByTestId('custom-error-id')).toBeInTheDocument();
  });

  it('uses default data-testid format when not provided', () => {
    render(<FieldError name="testField" error="Error" touched />);
    expect(screen.getByTestId('testfield-error')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <FieldError name="test" error="Error" touched className="custom-class" />
    );
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});
