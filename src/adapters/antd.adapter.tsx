/**
 * Ant Design Adapter
 * 
 * This adapter integrates Ant Design components with dynamic-formik-form.
 * Users need to install antd as a peer dependency.
 * 
 * Usage:
 * import { createAntDesignAdapter } from 'dynamic-formik-form';
 * import { Input, Button, Form, ... } from 'antd';
 * 
 * const antdAdapter = createAntDesignAdapter(
 *   Input, Button, Checkbox, Radio, Switch, Select, Form, Typography, Popover, DatePicker
 * );
 * 
 * <DynamicForm
 *   uiLibrary={{ adapter: antdAdapter, icons: antdIcons, name: 'antd' }}
 *   ...
 * />
 */

import React, { ComponentType, ReactNode } from 'react';
import { UILibraryAdapter } from '../types/ui-library.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AntDComponent = ComponentType<any>;

/**
 * Ant Design Adapter Factory
 * 
 * Creates an adapter for Ant Design components.
 * Users pass their Ant Design component imports to this factory function.
 */
export const createAntDesignAdapter = (
  // Ant Design component imports
  Input: AntDComponent,
  Button: AntDComponent,
  Checkbox: AntDComponent,
  Radio: AntDComponent,
  Switch: AntDComponent,
  Select: AntDComponent,
  Form: AntDComponent,
  Typography: AntDComponent,
  Popover: AntDComponent,
  DatePicker?: AntDComponent,
  DateTimePicker?: AntDComponent,
  Space?: AntDComponent,
  Card?: AntDComponent
): UILibraryAdapter => {
  // Ant Design Input has TextArea as a property
  const TextArea = (Input as any).TextArea || Input;
  const { TextArea: AntDTextArea } = Input as any;
  const actualTextArea = AntDTextArea || TextArea;
  
  const { Text: TypographyText } = Typography as any;
  const { Group: RadioGroup } = Radio as any;
  const SpaceComponent = Space || (({ children, ...props }: any) => <div {...props}>{children}</div>);
  const CardComponent = Card || (({ children, className }: any) => <div className={`ant-card ${className || ''}`}>{children}</div>);

  return {
    Input: ({ className, disabled, error, type, ...props }) => (
      <Input
        {...props}
        type={type}
        disabled={disabled}
        status={error ? 'error' : undefined}
        className={className}
      />
    ),

    Textarea: ({ className, disabled, error, rows, ...props }) => (
      <TextArea
        {...props}
        rows={rows || 4}
        disabled={disabled}
        status={error ? 'error' : undefined}
        className={className}
      />
    ),

    Select: ({ className, disabled, error, children, ...props }) => (
      <Select
        {...props}
        disabled={disabled}
        status={error ? 'error' : undefined}
        className={className}
      >
        {children}
      </Select>
    ),

    Checkbox: ({ className, disabled, label, ...props }) => (
      <Checkbox
        {...props}
        disabled={disabled}
        className={className}
      >
        {label}
      </Checkbox>
    ),

    Radio: ({ className, disabled, label, ...props }) => (
      <Radio
        {...props}
        disabled={disabled}
        className={className}
      >
        {label}
      </Radio>
    ),

    Switch: ({ className, disabled, ...props }) => (
      <Switch
        {...props}
        disabled={disabled}
        className={className}
      />
    ),

    Button: ({ className, disabled, children, variant, type, onClick, ...props }) => (
      <Button
        {...props}
        disabled={disabled}
        type={variant === 'primary' ? 'primary' : variant === 'secondary' ? 'default' : variant || 'default'}
        htmlType={type}
        onClick={onClick}
        className={className}
      >
        {children}
      </Button>
    ),

    FormControl: ({ className, children }) => {
      const FormComponent = Form as any;
      const FormItem = FormComponent.Item || FormComponent;
      return (
        <FormItem className={className}>
          {children}
        </FormItem>
      );
    },

    FormHelperText: ({ className, children }) => (
      <TypographyText type="secondary" className={className}>
        {children}
      </TypographyText>
    ),

    Label: ({ className, htmlFor, children }) => (
      <label className={className} htmlFor={htmlFor}>
        {children}
      </label>
    ),

    Box: ({ className, children, ...props }) => (
      <SpaceComponent className={className} {...props}>
        {children}
      </SpaceComponent>
    ),

    Paper: ({ className, children }) => (
      <CardComponent className={className}>
        {children}
      </CardComponent>
    ),

    Popover: ({ open, anchorEl, onClose, children, anchorOrigin, ...props }) => {
      if (!open) return null;
      
      return (
        <Popover
          open={open}
          onOpenChange={(visible: boolean) => !visible && onClose()}
          placement={anchorOrigin?.vertical === 'bottom' ? 'bottom' : 'top'}
          {...props}
        >
          {children}
        </Popover>
      );
    },

    MenuItem: ({ className, onClick, children }) => (
      <div className={`ant-menu-item ${className || ''}`} onClick={onClick}>
        {children}
      </div>
    ),

    Typography: ({ className, variant, children, ...props }) => {
      const TypographyComponent = Typography as any;
      return (
        <TypographyComponent className={className} {...props}>
          {children}
        </TypographyComponent>
      );
    },

    IconButton: ({ className, size, onClick, children, ...props }) => (
      <Button
        type="text"
        size={size}
        onClick={onClick}
        className={className}
        icon={children}
        {...props}
      />
    ),

    DatePicker: DatePicker
      ? ({ value, onChange, format, disabled, ...props }) => (
          <DatePicker
            value={value}
            onChange={onChange}
            format={format}
            disabled={disabled}
            {...props}
          />
        )
      : undefined,

    DateTimePicker: DateTimePicker
      ? ({ value, onChange, format, disabled, views, ...props }) => (
          <DateTimePicker
            value={value}
            onChange={onChange}
            format={format}
            disabled={disabled}
            showTime={true}
            {...props}
          />
        )
      : undefined,
  };
};

