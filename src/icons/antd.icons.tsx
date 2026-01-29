/**
 * Ant Design Icons
 * 
 * This shows how to use Ant Design Icons with the library.
 * Users can use @ant-design/icons package.
 * 
 * Usage:
 * import { createAntDesignIcons } from 'dynamic-formik-form';
 * import {
 *   InfoCircleOutlined as InfoIcon,
 *   EyeOutlined as VisibilityIcon,
 *   EyeInvisibleOutlined as VisibilityOffIcon,
 *   CopyOutlined as CopyIcon,
 *   PlusCircleOutlined as AddIcon,
 *   DeleteOutlined as DeleteIcon,
 * } from '@ant-design/icons';
 * 
 * const antdIcons = createAntDesignIcons(
 *   InfoIcon,
 *   VisibilityIcon,
 *   VisibilityOffIcon,
 *   CopyIcon,
 *   AddIcon,
 *   DeleteIcon
 * );
 */

import React from 'react';
import { IconLibrary } from '../types/ui-library.types';

/**
 * Ant Design Icons Factory
 * 
 * Creates an icon library configuration for Ant Design icons.
 * Users pass their @ant-design/icons imports to this factory function.
 */
export const createAntDesignIcons = (
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

