import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ComponentField } from '../ComponentField';
import { renderWithFormik } from '../../../test/utils';

describe('ComponentField', () => {
  it('renders custom component', () => {
    const CustomComponent = () => <div>Custom Component</div>;
    renderWithFormik(
      <ComponentField
        name="custom"
        type="component"
        component={<CustomComponent />}
      />
    );
    expect(screen.getByText('Custom Component')).toBeInTheDocument();
  });

  it('renders block component when provided', () => {
    const BlockComponent = () => <div>Block Component</div>;
    renderWithFormik(
      <ComponentField
        name="custom"
        type="component"
        blockComponent={<BlockComponent />}
      />
    );
    expect(screen.getByText('Block Component')).toBeInTheDocument();
  });

  it('renders both component and blockComponent', () => {
    const CustomComponent = () => <div>Custom</div>;
    const BlockComponent = () => <div>Block</div>;
    renderWithFormik(
      <ComponentField
        name="custom"
        type="component"
        component={<CustomComponent />}
        blockComponent={<BlockComponent />}
      />
    );
    expect(screen.getByText('Custom')).toBeInTheDocument();
    expect(screen.getByText('Block')).toBeInTheDocument();
  });
});

