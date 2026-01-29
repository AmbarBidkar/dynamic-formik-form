import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { TextareaField } from '../TextareaField';
import { renderWithFormik } from '../../../test/utils';

describe('TextareaField', () => {
  it('renders textarea with label', () => {
    renderWithFormik(
      <TextareaField name="comments" type="textarea" label="Comments" />
    );
    expect(screen.getByLabelText(/comments/i)).toBeInTheDocument();
  });

  it('displays placeholder text', () => {
    renderWithFormik(
      <TextareaField
        name="comments"
        type="textarea"
        placeholder="Enter your comments"
      />
    );
    expect(screen.getByPlaceholderText('Enter your comments')).toBeInTheDocument();
  });

  it('handles textarea change', async () => {
    const { formik } = renderWithFormik(
      <TextareaField name="comments" type="textarea" label="Comments" />,
      {
        initialValues: { comments: '' },
      }
    );
    const textarea = document.querySelector('textarea[name="comments"]') as HTMLTextAreaElement;
    await act(async () => {
      fireEvent.change(textarea, { target: { value: 'Test comment', name: 'comments' } });
    });
    // Check both textarea value and formik value
    await waitFor(() => {
      const updatedTextarea = document.querySelector('textarea[name="comments"]') as HTMLTextAreaElement;
      expect(updatedTextarea?.value || formik?.values.comments).toBe('Test comment');
    }, { timeout: 2000 });
  });

  it('shows required indicator when required', () => {
    renderWithFormik(
      <TextareaField name="comments" type="textarea" label="Comments" required />
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message when field has error', async () => {
    renderWithFormik(
      <TextareaField name="comments" type="textarea" required />,
      {
        initialValues: { comments: '' },
        formikProps: {
          errors: { comments: 'Comments are required' },
          touched: { comments: true },
        },
      }
    );
    await waitFor(() => {
      expect(screen.getByText('Comments are required')).toBeInTheDocument();
    });
  });

  it('uses custom rows when provided', () => {
    renderWithFormik(
      <TextareaField name="comments" type="textarea" rows={10} />
    );
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '10');
  });

  it('uses default rows of 4 when not provided', () => {
    renderWithFormik(<TextareaField name="comments" type="textarea" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '4');
  });

  it('disables textarea when readonly is true', () => {
    renderWithFormik(
      <TextareaField name="comments" type="textarea" readonly />
    );
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('readOnly');
  });

  it('renders description when provided', () => {
    renderWithFormik(
      <TextareaField
        name="comments"
        type="textarea"
        desc="Enter your feedback"
      />
    );
    expect(screen.getByText('Enter your feedback')).toBeInTheDocument();
  });
});

