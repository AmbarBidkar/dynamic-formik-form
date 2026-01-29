import { ReactNode, ComponentType } from 'react';
import { FormikProps } from 'formik';

/**
 * Icon component interface
 * Allows any icon library to be used
 */
export type IconComponent = ComponentType<{
  className?: string;
  size?: string | number;
  [key: string]: unknown;
}>;

/**
 * Icon library configuration
 */
export interface IconLibrary {
  Info: IconComponent;
  Visibility: IconComponent;
  VisibilityOff: IconComponent;
  Copy: IconComponent;
  Add: IconComponent;
  Delete: IconComponent;
  [key: string]: IconComponent;
}

/**
 * Base UI component props that all UI libraries must support
 */
export interface BaseUIComponentProps {
  className?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  [key: string]: unknown;
}

/**
 * UI Library Adapter Interface
 * Each UI library (MUI, Bootstrap, etc.) must implement this interface
 */
export interface UILibraryAdapter {
  // Input components
  Input: ComponentType<BaseUIComponentProps & {
    type?: string;
    name: string;
    value: string | number;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    autoComplete?: string;
    readOnly?: boolean;
  }>;
  
  Textarea: ComponentType<BaseUIComponentProps & {
    name: string;
    value: string;
    placeholder?: string;
    rows?: number;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  }>;
  
  Select: ComponentType<BaseUIComponentProps & {
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
    children: ReactNode;
  }>;
  
  Checkbox: ComponentType<BaseUIComponentProps & {
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: ReactNode;
  }>;
  
  Radio: ComponentType<BaseUIComponentProps & {
    name: string;
    value: string | number;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: ReactNode;
  }>;
  
  Switch: ComponentType<BaseUIComponentProps & {
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }>;
  
  Button: ComponentType<BaseUIComponentProps & {
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    children: ReactNode;
    variant?: string;
  }>;
  
  // Layout components
  FormControl: ComponentType<{
    className?: string;
    required?: boolean;
    error?: boolean;
    children: ReactNode;
  }>;
  
  FormHelperText: ComponentType<{
    className?: string;
    children: ReactNode;
  }>;
  
  Label: ComponentType<{
    htmlFor?: string;
    className?: string;
    children: ReactNode;
  }>;
  
  // Container components
  Box: ComponentType<{
    className?: string;
    sx?: Record<string, unknown>;
    children?: ReactNode;
    [key: string]: unknown;
  }>;
  
  Paper: ComponentType<{
    className?: string;
    elevation?: number;
    children: ReactNode;
  }>;
  
  Popover: ComponentType<{
    open: boolean;
    anchorEl: HTMLElement | null;
    onClose: () => void;
    anchorOrigin?: { vertical: string; horizontal: string };
    children: ReactNode;
  }>;
  
  MenuItem: ComponentType<{
    className?: string;
    onClick: () => void;
    children: ReactNode;
  }>;
  
  Typography: ComponentType<{
    className?: string;
    variant?: string;
    color?: string;
    children: ReactNode;
  }>;
  
  IconButton: ComponentType<{
    className?: string;
    size?: 'small' | 'medium' | 'large';
    onClick?: () => void;
    children: ReactNode;
    [key: string]: unknown;
  }>;
  
  // Date picker components (optional, can be null if not supported)
  DatePicker?: ComponentType<{
    value: unknown;
    onChange: (value: unknown) => void;
    format?: string;
    disabled?: boolean;
    [key: string]: unknown;
  }>;
  
  DateTimePicker?: ComponentType<{
    value: unknown;
    onChange: (value: unknown) => void;
    format?: string;
    disabled?: boolean;
    views?: string[];
    [key: string]: unknown;
  }>;
  
  TextField?: ComponentType<{
    inputRef?: React.Ref<HTMLInputElement>;
    inputProps?: Record<string, unknown>;
    label?: string;
    id?: string;
    error?: boolean;
    helperText?: string;
    [key: string]: unknown;
  }>;
}

/**
 * UI Library configuration
 */
export interface UILibraryConfig {
  adapter: UILibraryAdapter;
  icons?: IconLibrary;
  name: string;
}

