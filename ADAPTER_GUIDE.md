# Creating Custom UI Library Adapters

This guide shows you how to create adapters for UI libraries not officially supported by `dynamic-formik-form`.

## Quick Start

An adapter is a factory function that maps your UI library's components to the `UILibraryAdapter` interface.

```typescript
import { UILibraryAdapter } from 'dynamic-formik-form';

export const createMyLibraryAdapter = (
  // Your UI library components
  Input: ComponentType<any>,
  Button: ComponentType<any>,
  // ... other components
): UILibraryAdapter => {
  return {
    Input: ({ className, disabled, error, ...props }) => (
      <Input
        {...props}
        className={className}
        disabled={disabled}
        error={error}
      />
    ),
    // ... map other components
  };
};
```

## Complete Example: Ant Design Adapter

```typescript
import React, { ComponentType } from 'react';
import { UILibraryAdapter } from 'dynamic-formik-form';
import {
  Input,
  Button,
  Checkbox,
  Radio,
  Switch,
  Select,
  Form,
  Typography,
  Popover,
  DatePicker,
  Space,
} from 'antd';

export const createAntDesignAdapter = (
  InputComponent: typeof Input = Input,
  ButtonComponent: typeof Button = Button,
  CheckboxComponent: typeof Checkbox = Checkbox,
  RadioComponent: typeof Radio = Radio,
  SwitchComponent: typeof Switch = Switch,
  SelectComponent: typeof Select = Select,
  FormComponent: typeof Form = Form,
  TypographyComponent: typeof Typography = Typography,
  PopoverComponent: typeof Popover = Popover,
  DatePickerComponent: typeof DatePicker = DatePicker,
): UILibraryAdapter => {
  const { TextArea } = InputComponent;
  
  return {
    Input: ({ className, disabled, error, type, ...props }) => (
      <InputComponent
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
      <SelectComponent
        {...props}
        disabled={disabled}
        status={error ? 'error' : undefined}
        className={className}
      >
        {children}
      </SelectComponent>
    ),

    Checkbox: ({ className, disabled, label, ...props }) => (
      <CheckboxComponent
        {...props}
        disabled={disabled}
        className={className}
      >
        {label}
      </CheckboxComponent>
    ),

    Radio: ({ className, disabled, label, ...props }) => (
      <RadioComponent
        {...props}
        disabled={disabled}
        className={className}
      >
        {label}
      </RadioComponent>
    ),

    Switch: ({ className, disabled, ...props }) => (
      <SwitchComponent
        {...props}
        disabled={disabled}
        className={className}
      />
    ),

    Button: ({ className, disabled, children, variant, ...props }) => (
      <ButtonComponent
        {...props}
        disabled={disabled}
        type={variant || 'default'}
        className={className}
      >
        {children}
      </ButtonComponent>
    ),

    FormControl: ({ className, children }) => (
      <FormComponent.Item className={className}>
        {children}
      </FormComponent.Item>
    ),

    FormHelperText: ({ className, children }) => (
      <TypographyComponent.Text type="secondary" className={className}>
        {children}
      </TypographyComponent.Text>
    ),

    Label: ({ className, htmlFor, children }) => (
      <label className={className} htmlFor={htmlFor}>
        {children}
      </label>
    ),

    Box: ({ className, children, ...props }) => (
      <Space className={className} {...props}>
        {children}
      </Space>
    ),

    Paper: ({ className, children }) => (
      <div className={`ant-card ${className || ''}`}>{children}</div>
    ),

    Popover: ({ open, anchorEl, onClose, children, ...props }) => (
      <PopoverComponent
        open={open}
        onOpenChange={(visible) => !visible && onClose()}
        {...props}
      >
        {children}
      </PopoverComponent>
    ),

    Typography: ({ className, variant, children, ...props }) => (
      <TypographyComponent className={className} {...props}>
        {children}
      </TypographyComponent>
    ),

    IconButton: ({ className, size, onClick, children }) => (
      <ButtonComponent
        type="text"
        size={size}
        onClick={onClick}
        className={className}
        icon={children}
      />
    ),

    DatePicker: DatePickerComponent
      ? ({ value, onChange, format, disabled, ...props }) => (
          <DatePickerComponent
            value={value}
            onChange={onChange}
            format={format}
            disabled={disabled}
            {...props}
          />
        )
      : undefined,
  };
};
```

## Usage

```typescript
import { DynamicForm, createAntDesignAdapter } from './adapters/antd';
import { useFormik } from 'formik';

const antdAdapter = createAntDesignAdapter();

<DynamicForm
  fields={fields}
  formik={formik}
  uiLibrary={{
    adapter: antdAdapter,
    name: 'antd',
  }}
/>
```

## Required Components

Your adapter must implement these components:

### Required
- `Input` - Text input field
- `Textarea` - Multi-line text input
- `Select` - Dropdown select
- `Checkbox` - Checkbox input
- `Radio` - Radio button
- `Switch` - Toggle switch
- `Button` - Button component
- `FormControl` - Form container
- `FormHelperText` - Helper/error text
- `Label` - Form label
- `Box` - Container component
- `Paper` - Card/paper component
- `Popover` - Popover/tooltip
- `Typography` - Text component
- `IconButton` - Icon button

### Optional
- `DatePicker` - Date picker (if your library supports it)
- `DateTimePicker` - Date-time picker (if your library supports it)
- `TextField` - Advanced text field wrapper

## Component Props Mapping

### Input Component

```typescript
Input: ComponentType<{
  type?: string;              // 'text', 'email', 'password', etc.
  name: string;               // Field name
  value: string | number;     // Field value
  placeholder?: string;        // Placeholder text
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  autoComplete?: string;      // Autocomplete attribute
  readOnly?: boolean;         // Read-only state
  disabled?: boolean;         // Disabled state
  error?: boolean;            // Error state
  className?: string;         // CSS classes
}>
```

### Error Handling

Most UI libraries have different ways to show errors:

- **MUI**: `error` prop on TextField
- **Bootstrap**: `isInvalid` prop on FormControl
- **Ant Design**: `status="error"` prop
- **Chakra**: `isInvalid` prop

Map the `error` prop appropriately:

```typescript
Input: ({ error, ...props }) => (
  <YourInput
    {...props}
    // Map error prop to your library's convention
    isInvalid={error}        // Bootstrap
    status={error ? 'error' : undefined}  // Ant Design
    error={error}            // MUI
  />
)
```

## Tips

1. **Use TypeScript** - Catch errors at compile time
2. **Test thoroughly** - Especially error states and disabled states
3. **Follow your library's patterns** - Don't fight the library's API
4. **Handle optional components** - Some libraries don't have all components
5. **Document differences** - Note any limitations or quirks

## Sharing Your Adapter

If you create a useful adapter, consider:

1. **GitHub Gist** - Share code snippets
2. **GitHub Repository** - Create a dedicated repo
3. **npm Package** - Publish as `dynamic-formik-form-antd-adapter`
4. **Community Showcase** - Submit to our examples

## Common Patterns

### Handling Missing Components

```typescript
DatePicker: YourLibrary.DatePicker
  ? ({ value, onChange, ...props }) => (
      <YourLibrary.DatePicker value={value} onChange={onChange} {...props} />
    )
  : undefined,  // Return undefined if not available
```

### Mapping Variants

```typescript
Button: ({ variant, ...props }) => (
  <YourButton
    {...props}
    // Map common variants
    variant={
      variant === 'primary' ? 'solid' :
      variant === 'secondary' ? 'outline' :
      variant || 'default'
    }
  />
)
```

### Handling Icons

```typescript
IconButton: ({ children, onClick }) => (
  <YourIconButton onClick={onClick}>
    {children}  // Icon component passed as children
  </YourIconButton>
)
```

## Need Help?

- Check existing adapters: `src/adapters/`
- Review the interface: `src/types/ui-library.types.ts`
- Open an issue on GitHub
- Check examples in `examples/` directory

