import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { FileUploadField } from '../FileUploadField';
import { renderWithFormik } from '../../../test/utils';

describe('FileUploadField', () => {
  it('renders file upload with label', () => {
    renderWithFormik(
      <FileUploadField name="file" type="fileupload" label="Upload File" />
    );
    expect(screen.getByLabelText(/upload file/i)).toBeInTheDocument();
  });

  it('renders file input', () => {
    renderWithFormik(
      <FileUploadField name="file" type="fileupload" />
    );
    const input = document.querySelector('input[type="file"]');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'file');
  });

  it('handles file selection', async () => {
    const { formik } = renderWithFormik(
      <FileUploadField name="file" type="fileupload" />,
      {
        initialValues: { file: null },
      }
    );
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    
    // Create a FileList-like object using Object.defineProperty
    const fileList = {
      0: file,
      length: 1,
      item: (index: number) => (index === 0 ? file : null),
      [Symbol.iterator]: function* () {
        yield file;
      },
    } as FileList;
    
    Object.defineProperty(input, 'files', {
      value: fileList,
      writable: false,
      configurable: true,
    });
    
    fireEvent.change(input, { target: { files: fileList } });
    
    await waitFor(() => {
      expect(formik?.values.file).toBeDefined();
    });
  });

  it('shows remove button when file is selected', () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    renderWithFormik(
      <FileUploadField name="file" type="fileupload" />,
      {
        initialValues: { file },
      }
    );
    expect(screen.getByText(/remove file/i)).toBeInTheDocument();
  });

  it('removes file when remove button is clicked', async () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    const { formik } = renderWithFormik(
      <FileUploadField name="file" type="fileupload" />,
      {
        initialValues: { file },
      }
    );
    // Verify file is initially displayed
    expect(screen.getByText(/remove file/i)).toBeInTheDocument();
    const removeButton = screen.getByText(/remove file/i);
    await act(async () => {
      fireEvent.click(removeButton);
    });
    // Check that remove button disappears (indicating file was removed)
    await waitFor(() => {
      expect(screen.queryByText(/remove file/i)).not.toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('shows required indicator when required', () => {
    renderWithFormik(
      <FileUploadField name="file" type="fileupload" label="File" required />
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message when field has error', async () => {
    renderWithFormik(
      <FileUploadField name="file" type="fileupload" required />,
      {
        initialValues: { file: null },
        formikProps: {
          errors: { file: 'File is required' },
          touched: { file: true },
        },
      }
    );
    await waitFor(() => {
      expect(screen.getByText('File is required')).toBeInTheDocument();
    });
  });
});

