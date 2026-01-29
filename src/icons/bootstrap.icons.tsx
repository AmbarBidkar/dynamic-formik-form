/**
 * Bootstrap Icons Example
 * 
 * This shows how to use Bootstrap Icons with the library.
 * Users can use react-bootstrap-icons or bootstrap-icons package.
 * 
 * Usage:
 * import { bootstrapIcons } from 'dynamic-formik-form/icons/bootstrap';
 * 
 * <DynamicForm
 *   uiLibrary={{ adapter: bootstrapAdapter, icons: bootstrapIcons, name: 'bootstrap' }}
 *   ...
 * />
 */

import { IconLibrary } from '../types/ui-library.types';

/**
 * Bootstrap Icons
 * 
 * NOTE: This is a template. In actual usage, you would:
 * 1. Install react-bootstrap-icons or bootstrap-icons as a peer dependency
 * 2. Import actual Bootstrap icons
 * 3. Export them as IconLibrary
 * 
 * Example with react-bootstrap-icons:
 * import {
 *   InfoCircle as InfoIcon,
 *   Eye as VisibilityIcon,
 *   EyeSlash as VisibilityOffIcon,
 *   Clipboard as CopyIcon,
 *   PlusCircle as AddIcon,
 *   Trash as DeleteIcon,
 * } from 'react-bootstrap-icons';
 * 
 * export const bootstrapIcons: IconLibrary = {
 *   Info: InfoIcon,
 *   Visibility: VisibilityIcon,
 *   VisibilityOff: VisibilityOffIcon,
 *   Copy: CopyIcon,
 *   Add: AddIcon,
 *   Delete: DeleteIcon,
 * };
 */

// Placeholder - users should replace with actual Bootstrap icons
export const createBootstrapIcons = (
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

