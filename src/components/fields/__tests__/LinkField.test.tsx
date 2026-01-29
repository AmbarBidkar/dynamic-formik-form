import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LinkField } from '../LinkField';
import { renderWithFormik } from '../../../test/utils';

describe('LinkField', () => {
  it('renders link with label', () => {
    renderWithFormik(
      <LinkField name="link" type="link" label="Click here" />
    );
    expect(screen.getByText('Click here')).toBeInTheDocument();
  });

  it('calls onClickLink when link is clicked', () => {
    const handleClick = vi.fn();
    renderWithFormik(
      <LinkField
        name="link"
        type="link"
        label="Click here"
        onClickLink={handleClick}
      />
    );
    const link = screen.getByText('Click here');
    fireEvent.click(link);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders description when provided', () => {
    renderWithFormik(
      <LinkField
        name="link"
        type="link"
        label="Link"
        desc="Click to learn more"
      />
    );
    expect(screen.getByText('Click to learn more')).toBeInTheDocument();
  });
});

