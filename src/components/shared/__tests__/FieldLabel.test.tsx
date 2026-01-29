import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FieldLabel } from '../FieldLabel';
import { renderWithFormik } from '../../../test/utils';

describe('FieldLabel', () => {
  it('renders label text', () => {
    renderWithFormik(<FieldLabel name="test" label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders required indicator when required is true', () => {
    renderWithFormik(
      <FieldLabel name="test" label="Test Label" required />
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders optional text when showOptional is true', () => {
    renderWithFormik(
      <FieldLabel name="test" label="Test Label" showOptional />
    );
    expect(screen.getByText('(Optional)')).toBeInTheDocument();
  });

  it('does not render when label is not provided', () => {
    const { container } = renderWithFormik(<FieldLabel name="test" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders info icon when info is provided', () => {
    renderWithFormik(
      <FieldLabel name="test" label="Test Label" info="Help text" />
    );
    // Info icon should be present (checking for aria-label)
    expect(screen.getByLabelText('show info')).toBeInTheDocument();
  });
});

