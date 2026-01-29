/**
 * Material-UI Icons Example
 * 
 * This shows how to use Material-UI icons with the library.
 * Users need to install @mui/icons-material as a peer dependency.
 * 
 * Usage:
 * import { muiIcons } from 'dynamic-formik-form/icons/mui';
 * 
 * <DynamicForm
 *   uiLibrary={{ adapter: muiAdapter, icons: muiIcons, name: 'mui' }}
 *   ...
 * />
 */

import { IconLibrary } from '../types/ui-library.types';

/**
 * Material-UI Icons
 * 
 * NOTE: This is a template. In actual usage, you would:
 * 1. Install @mui/icons-material as a peer dependency
 * 2. Import actual MUI icons
 * 3. Export them as IconLibrary
 * 
 * Example:
 * import {
 *   Info as InfoIcon,
 *   Visibility as VisibilityIcon,
 *   VisibilityOff as VisibilityOffIcon,
 *   ContentCopy as CopyIcon,
 *   AddCircleOutline as AddIcon,
 *   DeleteOutline as DeleteIcon,
 * } from '@mui/icons-material';
 * 
 * export const muiIcons: IconLibrary = {
 *   Info: InfoIcon,
 *   Visibility: VisibilityIcon,
 *   VisibilityOff: VisibilityOffIcon,
 *   Copy: CopyIcon,
 *   Add: AddIcon,
 *   Delete: DeleteIcon,
 * };
 */

// Placeholder - users should replace with actual MUI icons
export const createMUIIcons = (
  Info: React.ComponentType<any>,
  Visibility: React.ComponentType<any>,
  VisibilityOff: React.ComponentType<any>,
  Copy: React.ComponentType<any>,
  Add: React.ComponentType<any>,
  Delete: React.ComponentType<any>
): IconLibrary => {
  return {
    Info,
    Visibility,
    VisibilityOff,
    Copy,
    Add,
    Delete,
  };
};

