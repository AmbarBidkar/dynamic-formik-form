import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { IconRenderer } from '../shared/IconRenderer';
import { formatString } from '../../utils/field.utils';
import { BaseFieldConfig } from '../../types/field.types';

interface DeleteFieldProps extends BaseFieldConfig {
  type: 'delete';
  handleDeleteAttribute?: (name: string) => void;
}

/**
 * DeleteField Component
 * Renders a delete button/icon
 */
export const DeleteField: React.FC<DeleteFieldProps> = ({
  name,
  type,
  handleDeleteAttribute,
  index,
}) => {
  const { uiLibrary } = useFormContext();
  const { adapter, icons } = uiLibrary;
  const IconButton = adapter.IconButton;
  const DeleteIcon = icons?.Delete;

  const handleClick = () => {
    if (handleDeleteAttribute) {
      handleDeleteAttribute(name);
    }
  };

  return (
    <div className="col-1" key={index}>
      {DeleteIcon && IconButton ? (
        <IconButton
          role="button"
          data-testid={`${formatString(name)}-delete-btn`}
          onClick={handleClick}
          className="text-danger fs-4 mt-3"
        >
          <IconRenderer Icon={DeleteIcon} size={20} />
        </IconButton>
      ) : (
        <button
          type="button"
          data-testid={`${formatString(name)}-delete-btn`}
          onClick={handleClick}
          className="text-danger fs-4 mt-3"
        >
          ×
        </button>
      )}
    </div>
  );
};

