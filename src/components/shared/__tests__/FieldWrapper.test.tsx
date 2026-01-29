import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FieldWrapper } from '../FieldWrapper';

describe('FieldWrapper', () => {
  it('renders children', () => {
    render(
      <FieldWrapper>
        <div>Test Content</div>
      </FieldWrapper>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies customClass when provided', () => {
    const { container } = render(
      <FieldWrapper customClass="custom-wrapper">
        <div>Content</div>
      </FieldWrapper>
    );
    expect(container.querySelector('.custom-wrapper')).toBeInTheDocument();
  });

  it('applies default mb-4 class when customClass is not provided', () => {
    const { container } = render(
      <FieldWrapper>
        <div>Content</div>
      </FieldWrapper>
    );
    expect(container.querySelector('.mb-4')).toBeInTheDocument();
  });

  it('applies ps-5 class when isChild is true and noIndent is false', () => {
    const { container } = render(
      <FieldWrapper isChild>
        <div>Content</div>
      </FieldWrapper>
    );
    expect(container.querySelector('.ps-5')).toBeInTheDocument();
  });

  it('does not apply ps-5 when noIndent is true', () => {
    const { container } = render(
      <FieldWrapper isChild noIndent>
        <div>Content</div>
      </FieldWrapper>
    );
    expect(container.querySelector('.ps-5')).toBeNull();
  });

  it('hides content when hidden is true', () => {
    const { container } = render(
      <FieldWrapper hidden>
        <div>Content</div>
      </FieldWrapper>
    );
    expect(container.querySelector('.d-none')).toBeInTheDocument();
  });

  it('applies className when provided', () => {
    const { container } = render(
      <FieldWrapper className="additional-class">
        <div>Content</div>
      </FieldWrapper>
    );
    expect(container.querySelector('.additional-class')).toBeInTheDocument();
  });

  it('combines customClass and className', () => {
    const { container } = render(
      <FieldWrapper customClass="custom" className="additional">
        <div>Content</div>
      </FieldWrapper>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('custom');
    expect(wrapper.className).toContain('additional');
  });
});
