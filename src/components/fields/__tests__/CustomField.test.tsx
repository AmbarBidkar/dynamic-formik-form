import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CustomField } from '../CustomField';
import { renderWithFormik } from '../../../test/utils';

describe('CustomField', () => {
  it('renders custom component with label', () => {
    const CustomComponent = () => <div>Custom Content</div>;
    renderWithFormik(
      <CustomField
        name="custom"
        type="custom"
        label="Custom Field"
        component={<CustomComponent />}
      />
    );
    expect(screen.getByText('Custom Field')).toBeInTheDocument();
    expect(screen.getByText('Custom Content')).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    const CustomComponent = () => <div>Content</div>;
    renderWithFormik(
      <CustomField
        name="custom"
        type="custom"
        label="Custom"
        component={<CustomComponent />}
        required
      />
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    const CustomComponent = () => <div>Content</div>;
    renderWithFormik(
      <CustomField
        name="custom"
        type="custom"
        label="Custom"
        component={<CustomComponent />}
        desc="Helper text"
      />
    );
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('renders without label when not provided', () => {
    const CustomComponent = () => <div>Content</div>;
    renderWithFormik(
      <CustomField
        name="custom"
        type="custom"
        component={<CustomComponent />}
      />
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});

