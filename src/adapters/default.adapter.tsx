import React, { ComponentType, ReactNode } from 'react';
import { UILibraryAdapter } from '../types/ui-library.types';

/**
 * Default HTML adapter - uses native HTML elements
 * This is a fallback when no UI library is provided
 */
export const defaultAdapter: UILibraryAdapter = {
  Input: ({ className, disabled, error, ...props }) => (
    <input
      className={`${className || ''} ${error ? 'error' : ''}`}
      disabled={disabled}
      {...props}
    />
  ),

  Textarea: ({ className, disabled, error, ...props }) => (
    <textarea
      className={`${className || ''} ${error ? 'error' : ''}`}
      disabled={disabled}
      {...props}
    />
  ),

  Select: ({ className, disabled, error, children, ...props }) => (
    <select
      className={`${className || ''} ${error ? 'error' : ''}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </select>
  ),

  Checkbox: ({ className, disabled, label, ...props }) => (
    <label className={className}>
      <input type="checkbox" disabled={disabled} {...props} />
      {label}
    </label>
  ),

  Radio: ({ className, disabled, label, ...props }) => (
    <label className={className}>
      <input type="radio" disabled={disabled} {...props} />
      {label}
    </label>
  ),

  Switch: ({ className, disabled, ...props }) => (
    <input
      type="checkbox"
      className={`switch ${className || ''}`}
      disabled={disabled}
      {...props}
    />
  ),

  Button: ({ className, disabled, children, ...props }) => (
    <button className={className} disabled={disabled} {...props}>
      {children}
    </button>
  ),

  FormControl: ({ className, children }) => (
    <div className={`form-control ${className || ''}`}>{children}</div>
  ),

  FormHelperText: ({ className, children }) => (
    <small className={`form-helper-text ${className || ''}`}>{children}</small>
  ),

  Label: ({ className, htmlFor, children }) => (
    <label className={className} htmlFor={htmlFor}>
      {children}
    </label>
  ),

  Box: ({ className, children, ...props }) => (
    <div className={className} {...props}>
      {children}
    </div>
  ),

  Paper: ({ className, children }) => (
    <div className={`paper ${className || ''}`}>{children}</div>
  ),

  Popover: ({ open, anchorEl, onClose, children, anchorOrigin }) => {
    if (!open || !anchorEl) return null;
    
    const rect = anchorEl.getBoundingClientRect();
    const style: React.CSSProperties = {
      position: 'fixed',
      top: `${rect.bottom}px`,
      left: `${rect.left}px`,
      zIndex: 1000,
    };

    return (
      <div className="popover" style={style} onClick={onClose}>
        {children}
      </div>
    );
  },

  MenuItem: ({ className, onClick, children }) => (
    <div className={`menu-item ${className || ''}`} onClick={onClick}>
      {children}
    </div>
  ),

  Typography: ({ className, variant, children }) => (
    <div className={`typography typography-${variant || 'body1'} ${className || ''}`}>
      {children}
    </div>
  ),

  IconButton: ({ className, size, onClick, children, ...props }) => (
    <button
      type="button"
      className={`icon-button icon-button-${size || 'medium'} ${className || ''}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  ),
};

