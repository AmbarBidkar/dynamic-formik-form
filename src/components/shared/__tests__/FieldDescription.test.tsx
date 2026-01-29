import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FieldDescription } from '../FieldDescription';
import { renderWithFormik } from '../../../test/utils';

describe('FieldDescription', () => {
  it('renders description text', () => {
    renderWithFormik(<FieldDescription desc="This is a description" />);
    expect(screen.getByText('This is a description')).toBeInTheDocument();
  });

  it('does not render when desc is not provided', () => {
    const { container } = renderWithFormik(<FieldDescription />);
    expect(container.firstChild).toBeNull();
  });

  it('applies customDescClass when provided', () => {
    const { container } = renderWithFormik(
      <FieldDescription desc="Description" customDescClass="custom-class" />
    );
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('applies className when provided', () => {
    const { container } = renderWithFormik(
      <FieldDescription desc="Description" className="test-class" />
    );
    expect(container.querySelector('.test-class')).toBeInTheDocument();
  });

  it('prioritizes customDescClass over className', () => {
    const { container } = renderWithFormik(
      <FieldDescription
        desc="Description"
        customDescClass="custom-class"
        className="test-class"
      />
    );
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
    expect(container.querySelector('.test-class')).toBeNull();
  });
});
