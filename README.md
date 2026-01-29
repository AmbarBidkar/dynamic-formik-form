# dynamic-formik-form

> **A production-ready, adapter-based React form library that generates dynamic forms from JSON configuration using Formik and Yup. Works with Material-UI, Bootstrap, Ant Design, or plain CSS.**

[![npm version](https://img.shields.io/npm/v/dynamic-formik-form.svg)](https://www.npmjs.com/package/dynamic-formik-form)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## Why This Library?

Building forms in React is repetitive and error-prone. `dynamic-formik-form` solves this by:

- **🎯 JSON-Driven Forms**: Define forms as data, not code. Perfect for admin panels, CMSs, and dynamic UIs
- **🎨 UI Library Agnostic**: Use Material-UI, Bootstrap, Ant Design, or your own CSS—switch adapters without changing form logic
- **✅ Built on Battle-Tested Libraries**: Leverages Formik for state management and Yup for validation
- **🔧 Production-Ready**: Extracted from production code, handling edge cases like conditional fields, nested arrays, and complex validation
- **📦 Zero Bloat**: Tree-shakeable, modular architecture. Only bundle what you use
- **🔌 Fully Extensible**: Create custom adapters for any UI library or design system

## Features

- 🎨 **Extensible UI Libraries** - Material-UI, Bootstrap, Ant Design, or plain CSS
- 🎯 **22 Field Types** - Input, textarea, select, checkbox, radio, date picker, file upload, and more
- 🔌 **Icon Flexibility** - Use any icon library (default SVG icons included)
- 📦 **TypeScript First** - Full TypeScript support with comprehensive types
- 🧩 **Modular Architecture** - Small, focused, reusable components
- ✅ **Production Ready** - Extracted from production code, battle-tested
- 🔄 **Conditional Fields** - Show/hide fields based on form values
- 📋 **Field Arrays** - Dynamic key-value pairs and simple arrays
- 🎛️ **Nested Attributes** - Complex nested form structures
- 🔍 **Async Select** - Load options from API endpoints
- 🎨 **Custom Components** - Inject custom React components anywhere

## Installation

### Core Package

```bash
npm install dynamic-formik-form formik yup react react-dom
```

### Peer Dependencies

The library requires these peer dependencies (you control the versions):

- `react` >= 18.0.0
- `react-dom` >= 18.0.0
- `formik` ^2.0.0 || ^3.0.0
- `yup` ^1.0.0

### UI Library Adapters (Optional)

Choose one or more UI libraries:

```bash
# Material-UI
npm install @mui/material @mui/x-date-pickers @mui/icons-material

# Bootstrap React
npm install react-bootstrap react-bootstrap-icons bootstrap

# Ant Design
npm install antd @ant-design/icons

# Or use plain CSS - no additional dependencies needed!
```

## Quick Start

### Minimal Example

```typescript
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DynamicForm } from 'dynamic-formik-form';

const MyForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(8, 'Password must be at least 8 characters').required(),
    }),
    onSubmit: (values) => {
      console.log('Form submitted:', values);
    },
  });

  const fields = [
    {
      type: 'inputfield' as const,
      name: 'email',
      label: 'Email Address',
      placeholder: 'Enter your email',
      required: true,
      fieldType: 'email',
    },
    {
      type: 'inputfield' as const,
      name: 'password',
      label: 'Password',
      fieldType: 'password',
      required: true,
      isVisibleEnable: true, // Show password visibility toggle
    },
  ];

  return (
    <form onSubmit={formik.handleSubmit}>
      <DynamicForm fields={fields} formik={formik} />
      <button type="submit">Submit</button>
    </form>
  );
};
```

### JSON-Driven Form Example

```typescript
// Define form structure as JSON (can come from API, config file, etc.)
const formConfig = [
  {
    type: 'inputfield',
    name: 'username',
    label: 'Username',
    required: true,
  },
  {
    type: 'dropdown',
    name: 'country',
    label: 'Country',
    values: {
      '': 'Select a country',
      us: 'United States',
      uk: 'United Kingdom',
      ca: 'Canada',
    },
    required: true,
  },
  {
    type: 'textarea',
    name: 'comments',
    label: 'Comments',
    rows: 4,
  },
];

// Render the form
<DynamicForm fields={formConfig} formik={formik} />
```

## UI Library Adapters

### With Material-UI

```typescript
import { DynamicForm, createMUIAdapter, createMUIIcons } from 'dynamic-formik-form';
import {
  Box,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Switch,
  Typography,
  Popover,
  MenuItem,
  Paper,
  IconButton,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import {
  Info as InfoIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  ContentCopy as CopyIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const muiAdapter = createMUIAdapter(
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  IconButton,
  MenuItem,
  Paper,
  Popover,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Typography,
  DatePicker
);

const muiIcons = createMUIIcons(
  InfoIcon,
  VisibilityIcon,
  VisibilityOffIcon,
  CopyIcon,
  AddIcon,
  DeleteIcon
);

<DynamicForm
  fields={fields}
  formik={formik}
  uiLibrary={{
    adapter: muiAdapter,
    icons: muiIcons,
    name: 'mui',
  }}
/>
```

### With Bootstrap

```typescript
import { DynamicForm, createBootstrapAdapter, createBootstrapIcons } from 'dynamic-formik-form';
import {
  Form,
  FormControl,
  FormLabel,
  FormText,
  FormCheck,
  FormSelect,
  Button,
  InputGroup,
  OverlayTrigger,
  Popover,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import {
  InfoCircle as InfoIcon,
  Eye as VisibilityIcon,
  EyeSlash as VisibilityOffIcon,
  Clipboard as CopyIcon,
  PlusCircle as AddIcon,
  Trash as DeleteIcon,
} from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const bootstrapAdapter = createBootstrapAdapter(
  Form,
  FormControl,
  FormLabel,
  FormText,
  FormCheck,
  FormSelect,
  Button,
  InputGroup,
  OverlayTrigger,
  Popover,
  ListGroup,
  ListGroupItem
);

const bootstrapIcons = createBootstrapIcons(
  InfoIcon,
  VisibilityIcon,
  VisibilityOffIcon,
  CopyIcon,
  AddIcon,
  DeleteIcon
);

<DynamicForm
  fields={fields}
  formik={formik}
  uiLibrary={{
    adapter: bootstrapAdapter,
    icons: bootstrapIcons,
    name: 'bootstrap',
  }}
/>
```

### With Ant Design

```typescript
import { DynamicForm, createAntDesignAdapter, createAntDesignIcons } from 'dynamic-formik-form';
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
} from 'antd';
import {
  InfoCircleOutlined as InfoIcon,
  EyeOutlined as VisibilityIcon,
  EyeInvisibleOutlined as VisibilityOffIcon,
  CopyOutlined as CopyIcon,
  PlusCircleOutlined as AddIcon,
  DeleteOutlined as DeleteIcon,
} from '@ant-design/icons';

const antdAdapter = createAntDesignAdapter(
  Input,
  Button,
  Checkbox,
  Radio,
  Switch,
  Select,
  Form,
  Typography,
  Popover,
  DatePicker
);

const antdIcons = createAntDesignIcons(
  InfoIcon,
  VisibilityIcon,
  VisibilityOffIcon,
  CopyIcon,
  AddIcon,
  DeleteIcon
);

<DynamicForm
  fields={fields}
  formik={formik}
  uiLibrary={{
    adapter: antdAdapter,
    icons: antdIcons,
    name: 'antd',
  }}
/>
```

### With Plain CSS (No UI Library)

The library works out-of-the-box with native HTML elements. Just style them with your own CSS!

```typescript
import { DynamicForm } from 'dynamic-formik-form';
import './my-custom-styles.css';

// No uiLibrary prop needed - uses default HTML adapter
<DynamicForm fields={fields} formik={formik} />
```

```css
/* my-custom-styles.css */
input[type="text"],
input[type="email"],
input[type="password"] {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
}

input.error {
  border-color: #dc3545;
}

.form-control {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
}
```

## API Reference

### `<DynamicForm />`

The main component that renders fields dynamically based on configuration.

#### Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fields` | `(FieldConfig \| false)[]` | Yes | - | Array of field configurations. Use `false` for conditional fields. |
| `formik` | `FormikProps<T>` | Yes | - | Formik instance from `useFormik()` hook. Must include `values`, `errors`, `touched`, `handleChange`, `handleBlur`, `setFieldValue`, etc. |
| `uiLibrary` | `UILibraryConfig` | No | `{ adapter: defaultAdapter, icons: defaultIcons }` | UI library adapter and icons configuration. See [Adapter Configuration](#adapter-configuration). |
| `firstInitialValues` | `T` | No | - | Initial values for the form. Used for resetting child fields. |
| `customFormChange` | `(event: ChangeEvent, type: string) => void` | No | - | Custom change handler that receives the event and field type. Overrides default Formik handlers. |
| `fieldCount` | `number` | No | - | Total number of fields. Used for field array management. |
| `attributeFields` | `FieldConfig[]` | No | - | Additional fields for attribute field type. |
| `onUpdateFormFields` | `(fields: FieldConfig[]) => void` | No | - | Callback when fields are updated dynamically. |
| `handleDeleteChange` | `(count: number) => void` | No | - | Callback when field array items are deleted. |
| `RadiusTab` | `boolean` | No | `false` | Enable rounded tab styling for attribute fields. |
| `value` | `number` | No | - | Tab index value for attribute fields. |

#### Example

```typescript
<DynamicForm
  fields={fields}
  formik={formik}
  uiLibrary={{
    adapter: muiAdapter,
    icons: muiIcons,
    name: 'mui',
  }}
  customFormChange={(event, type) => {
    console.log('Field changed:', type, event.target.value);
  }}
/>
```

### Field Configuration (`FieldConfig`)

All field types extend `BaseFieldConfig` with type-specific properties.

#### BaseFieldConfig

Common properties available on all field types:

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `name` | `string` | Yes | - | Field name (must match Formik field name). |
| `type` | `FieldType` | Yes | - | Field type. See [Field Types](#field-types). |
| `label` | `string` | No | - | Field label displayed above the input. |
| `placeholder` | `string` | No | - | Placeholder text for input fields. |
| `desc` | `string` | No | - | Description/helper text displayed below the field. |
| `info` | `string` | No | - | Info tooltip text. Shows info icon when provided. |
| `required` | `boolean` | No | `false` | Whether the field is required. Shows asterisk (*) indicator. |
| `disabled` | `boolean` | No | `false` | Whether the field is disabled. |
| `hidden` | `boolean` | No | `false` | Whether the field is hidden (not rendered). |
| `readonly` | `boolean` | No | `false` | Whether the field is read-only. |
| `customClass` | `string` | No | - | Custom CSS class for the field wrapper. |
| `customLabelClass` | `string` | No | - | Custom CSS class for the label. |
| `customComponentClass` | `string` | No | - | Custom CSS class for the input component. |
| `customDescClass` | `string` | No | - | Custom CSS class for the description text. |
| `customAttrClass` | `string` | No | - | Custom CSS class for attribute fields. |
| `dataTestId` | `string` | No | - | Data test ID for testing. Auto-generated if not provided. |
| `noIndent` | `boolean` | No | `false` | Remove indentation for nested/child fields. |
| `showOptional` | `boolean` | No | `false` | Show "(optional)" text for non-required fields. |
| `isButtonVisible` | `boolean` | No | `false` | Show action button (field-specific). |
| `showCustomError` | `boolean` | No | `false` | Always show error message even if field is not touched. |
| `shouldHide` | `(params: { formik, name, index? }) => boolean` | No | - | Function to conditionally hide field based on form state. |
| `child` | `FieldConfig[]` | No | - | Child fields shown conditionally based on parent value. |
| `hiddenlabel` | `string` | No | - | Value that triggers child field visibility (for dropdown/select). |
| `targetType` | `string` | No | - | Value that triggers child field visibility (for radio buttons). |
| `component` | `ReactNode` | No | - | Custom React component rendered after the field. |
| `blockComponent` | `ReactNode` | No | - | Custom React component rendered as a block element. |
| `customHandleChange` | `(event, type, index?) => void` | No | - | Custom change handler for this specific field. |
| `customFormChange` | `(event, type) => void` | No | - | Custom form-level change handler. |
| `onBlur` | `(e: FocusEvent) => void` | No | - | Custom blur handler. |
| `onClickLink` | `() => void` | No | - | Click handler for link fields. |
| `isVisibleEnable` | `boolean` | No | `false` | Show password visibility toggle (for password fields). |
| `isCopyEnable` | `boolean` | No | `false` | Show copy button (for text fields). |
| `customIcon` | `ReactNode` | No | - | Custom icon component. |
| `ref` | `Ref<HTMLElement>` | No | - | React ref forwarded to the input element. |

#### Field Type-Specific Configurations

##### InputField (`type: 'inputfield'`)

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fieldType` | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url'` | No | `'text'` | HTML input type. |
| `autocomplete` | `string` | No | - | Autocomplete attribute value. |
| `min` | `number` | No | - | Minimum value (for number type). |
| `max` | `number` | No | - | Maximum value (for number type). |
| `suffix` | `string` | No | - | Suffix text displayed after input. |
| `ignoreChar` | `boolean` | No | `false` | Ignore special characters in input. |

##### TextareaField (`type: 'textarea'`)

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `rows` | `number` | No | `4` | Number of visible text rows. |

##### SelectField (`type: 'dropdown' \| 'singleSelect' \| 'multiSelect' \| 'asyncSelect'`)

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `values` | `Array<{value, label, desc?}> \| Record<string, string>` | No | `{}` | Options for select. Array format for react-select, object for native select. |
| `isSearchable` | `boolean` | No | `false` | Enable search/filter (react-select only). |
| `isMulti` | `boolean` | No | `false` | Allow multiple selections (react-select only). |
| `loaderCall` | `(inputValue: string) => Promise<{apps, error?}>` | No | - | Async function to load options (asyncSelect only). |
| `headerKey` | `string` | No | - | Header key for grouped options. |
| `optionsLabel` | `boolean` | No | `false` | Show label in options. |
| `disabledDropdownOption` | `boolean` | No | `false` | Disable dropdown option selection. |
| `disabledOptionText` | `string` | No | - | Text shown for disabled options. |
| `searchField` | `string` | No | - | Field name to search in async options. |
| `resetChild` | `boolean` | No | `false` | Reset child fields when selection changes. |
| `ignoreChar` | `boolean` | No | `false` | Ignore special characters (dropdown only). |

##### CheckboxField (`type: 'checkbox'`)

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `values` | `Record<string, string>` | No | `{}` | Checkbox options (for multiple checkboxes). |

##### RadioField (`type: 'radiobtn'`)

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `values` | `Record<string, string>` | No | `{}` | Radio button options. Key is value, value is label. |

##### DatePickerField (`type: 'datePicker' \| 'dateTimePicker'`)

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `dateFormat` | `string` | No | - | Date format string. |
| `disablePast` | `boolean` | No | `false` | Disable past dates. |
| `views` | `string[]` | No | - | Date picker views (MUI only). |

##### FieldArrayField (`type: 'fieldArray'`)

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `properties` | `{isKeyValue?: boolean, keyPlaceholder?: string, valuePlaceholder?: string}` | No | - | Configuration for key-value pairs or simple arrays. |
| `buttonLabel` | `string` | No | - | Label for add/remove buttons. |
| `addNewFieldBtnLabel` | `string` | No | `'Add New'` | Label for add button. |
| `minimumValuePresent` | `boolean` | No | `false` | Require at least one item. |
| `showAddNewFieldBtn` | `boolean` | No | `true` | Show add button. |

##### AttributeField (`type: 'attribute'`)

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `properties` | `FieldConfig[]` | No | `[]` | Fields within each attribute item. |
| `addNewField` | `Record<string, unknown>` | No | `{}` | Default values for new attribute items. |
| `showIllustration` | `boolean` | No | `false` | Show visual illustration. |
| `showAddNewFieldBtn` | `boolean` | No | `true` | Show add button. |
| `addNewFieldBtnLabel` | `string` | No | `'Add New'` | Label for add button. |
| `minimumValuePresent` | `boolean` | No | `false` | Require at least one item. |

##### CounterField (`type: 'counter'`)

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `min` | `number` | No | - | Minimum value. |
| `max` | `number` | No | - | Maximum value. |
| `suffix` | `string` | No | - | Suffix text displayed after counter. |

##### EditableDivField (`type: 'editablediv'`)

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `availableFields` | `Array<{key: string, label: string}>` | No | `[]` | Fields available for insertion into editable div. |

## Field Types

The library supports 22 field types:

1. **`inputfield`** - Text inputs (text, email, password, number, tel, url)
2. **`textarea`** - Multi-line text input
3. **`dropdown`** - Native HTML select dropdown
4. **`singleSelect`** - Single-select dropdown (react-select compatible)
5. **`multiSelect`** - Multi-select dropdown (react-select compatible)
6. **`asyncSelect`** - Async-loading select (react-select compatible)
7. **`checkbox`** - Checkbox input
8. **`radiobtn`** - Radio button group
9. **`toggle`** - Switch/toggle component
10. **`fileupload`** - File upload input
11. **`datePicker`** - Date picker
12. **`dateTimePicker`** - Date-time picker
13. **`counter`** - Counter with increment/decrement
14. **`fieldArray`** - Dynamic array fields (key-value or simple)
15. **`attribute`** - Complex nested attribute mapping
16. **`editablediv`** - ContentEditable with field insertion
17. **`text`** - Display text (read-only)
18. **`link`** - Clickable link field
19. **`component`** - Custom component wrapper
20. **`custom`** - Custom field with label/description
21. **`emptyField`** - Hidden input field
22. **`delete`** - Delete button/icon

## Advanced Usage

### Conditional Fields

Show/hide fields based on form values:

```typescript
const fields = [
  {
    type: 'dropdown',
    name: 'userType',
    label: 'User Type',
    values: {
      '': 'Select',
      admin: 'Admin',
      user: 'User',
    },
    child: [
      {
        type: 'inputfield',
        name: 'adminCode',
        label: 'Admin Code',
        hiddenlabel: 'admin', // Shown when userType === 'admin'
      },
    ],
  },
];
```

### Dynamic Validation

Use Yup's dynamic validation:

```typescript
const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(8)
    .when('confirmPassword', {
      is: (value: string) => value,
      then: (schema) => schema.required('Password is required'),
    }),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required(),
});
```

### Custom Field Renderers

Inject custom React components:

```typescript
const fields = [
  {
    type: 'inputfield',
    name: 'email',
    label: 'Email',
    component: <CustomEmailValidator />, // Rendered after field
  },
  {
    type: 'custom',
    name: 'customSection',
    label: 'Custom Section',
    blockComponent: <MyCustomComponent />, // Rendered as block
  },
];
```

### Field Arrays

Dynamic key-value pairs:

```typescript
const fields = [
  {
    type: 'fieldArray',
    name: 'metadata',
    label: 'Metadata',
    properties: {
      isKeyValue: true,
      keyPlaceholder: 'Key',
      valuePlaceholder: 'Value',
    },
    addNewFieldBtnLabel: 'Add Metadata',
  },
];
```

### Async Select

Load options from API:

```typescript
const fields = [
  {
    type: 'asyncSelect',
    name: 'user',
    label: 'Select User',
    loaderCall: async (inputValue: string) => {
      const response = await fetch(`/api/users?search=${inputValue}`);
      const data = await response.json();
      return {
        apps: data.users.map((user: any) => ({
          value: user.id,
          label: user.name,
        })),
      };
    },
  },
];
```

### Custom Adapters

Create adapters for any UI library. See [ADAPTER_GUIDE.md](./ADAPTER_GUIDE.md) for detailed instructions.

```typescript
import { UILibraryAdapter } from 'dynamic-formik-form';

export const createMyLibraryAdapter = (
  Input,
  Button,
  // ... your UI components
): UILibraryAdapter => {
  return {
    Input: ({ error, ...props }) => (
      <Input {...props} hasError={error} />
    ),
    // ... map other components
  };
};
```

## Architecture

### Core vs Adapter Responsibility

- **Core Library**: Handles form logic, validation, field rendering, conditional logic, and state management
- **Adapters**: Map UI library components to a common interface. No form logic.

### Why Adapter Pattern?

1. **Flexibility**: Users choose their UI library without vendor lock-in
2. **Tree-Shaking**: Only bundle the adapter you use
3. **Version Control**: Users control UI library versions (peer dependencies)
4. **Extensibility**: Easy to add new UI libraries without modifying core
5. **Testing**: Adapters can be mocked/swapped easily

### Adding New UI Library Support

1. Create adapter factory function (see `src/adapters/`)
2. Create icon factory function (see `src/icons/`)
3. Export from `src/adapters/index.ts` and `src/icons/index.ts`
4. Document usage in README

See [ADAPTER_GUIDE.md](./ADAPTER_GUIDE.md) for complete guide.

## Limitations & Roadmap

### Current Limitations

- Date pickers require UI library adapters (MUI DatePicker, Ant Design DatePicker, etc.)
- File uploads are basic (no drag-and-drop, preview, or progress)
- Async select requires react-select (not included as dependency)
- Some advanced field types (editablediv, attribute) are complex and may need customization

### Roadmap

- [ ] Built-in drag-and-drop file upload
- [ ] More date picker adapters
- [ ] Form builder UI component
- [ ] Form schema validator
- [ ] Performance optimizations for large forms
- [ ] Accessibility improvements
- [ ] More examples and recipes

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Ensure all tests pass (`npm test`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Development Setup

```bash
# Clone repository
git clone https://github.com/AmbarBidkar/dynamic-formik-form.git
cd dynamic-formik-form

# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build

# Development mode
npm run dev
```

## License

MIT © Ambar Bidkar

## Support

- 📖 [Documentation](./README.md)

---

**Made with ❤️ for the React community**
