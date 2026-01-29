/**
 * Material-UI Adapter Example
 * 
 * This is an example adapter showing how to integrate Material-UI components.
 * Users need to install @mui/material and @mui/x-date-pickers as peer dependencies.
 * 
 * Usage:
 * import { muiAdapter } from 'dynamic-formik-form/adapters/mui';
 * import { muiIcons } from 'dynamic-formik-form/icons/mui';
 * 
 * <DynamicForm
 *   uiLibrary={{ adapter: muiAdapter, icons: muiIcons, name: 'mui' }}
 *   ...
 * />
 */

import React, { ComponentType } from 'react';
import { UILibraryAdapter } from '../types/ui-library.types';

// These would be imported from @mui/material in actual usage
// For now, we'll create type-safe stubs that show the pattern
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MUIComponent = ComponentType<any>;

/**
 * Material-UI Adapter
 * 
 * NOTE: This is a template. In actual usage, you would:
 * 1. Install @mui/material, @mui/x-date-pickers as peer dependencies
 * 2. Import actual MUI components
 * 3. Map them to the adapter interface
 */
export const createMUIAdapter = (
  // These would be the actual MUI imports
  Box: MUIComponent,
  Button: MUIComponent,
  Checkbox: MUIComponent,
  FormControl: MUIComponent,
  FormControlLabel: MUIComponent,
  FormHelperText: MUIComponent,
  IconButton: MUIComponent,
  MenuItem: MUIComponent,
  Paper: MUIComponent,
  Popover: MUIComponent,
  Radio: MUIComponent,
  RadioGroup: MUIComponent,
  Switch: MUIComponent,
  TextField: MUIComponent,
  Typography: MUIComponent,
  DatePicker?: MUIComponent,
  DateTimePicker?: MUIComponent
): UILibraryAdapter => {
  return {
    Input: ({ className, disabled, error, type, ...props }) => (
      <TextField
        {...props}
        type={type}
        disabled={disabled}
        error={!!error}
        className={className}
        fullWidth
        variant="outlined"
      />
    ),

    Textarea: ({ className, disabled, error, rows, ...props }) => (
      <TextField
        {...props}
        multiline
        rows={rows || 4}
        disabled={disabled}
        error={!!error}
        className={className}
        fullWidth
        variant="outlined"
      />
    ),

    Select: ({ className, disabled, error, children, ...props }) => (
      <TextField
        {...props}
        select
        disabled={disabled}
        error={!!error}
        className={className}
        fullWidth
        variant="outlined"
      >
        {children}
      </TextField>
    ),

    Checkbox: ({ className, disabled, label, ...props }) => (
      <FormControlLabel
        control={
          <Checkbox
            {...props}
            disabled={disabled}
            className={className}
            color="primary"
          />
        }
        label={label}
      />
    ),

    Radio: ({ className, disabled, label, ...props }) => (
      <FormControlLabel
        control={
          <Radio
            {...props}
            disabled={disabled}
            className={className}
            color="primary"
          />
        }
        label={label}
      />
    ),

    Switch: ({ className, disabled, ...props }) => (
      <Switch
        {...props}
        disabled={disabled}
        className={className}
        color="primary"
      />
    ),

    Button: ({ className, disabled, children, variant, ...props }) => (
      <Button
        {...props}
        disabled={disabled}
        className={className}
        variant={variant || 'contained'}
        color="primary"
      >
        {children}
      </Button>
    ),

    FormControl: ({ className, required, error, children }) => (
      <FormControl
        className={className}
        required={required}
        error={!!error}
        fullWidth
      >
        {children}
      </FormControl>
    ),

    FormHelperText: ({ className, children }) => (
      <FormHelperText className={className}>{children}</FormHelperText>
    ),

    Label: ({ className, htmlFor, children }) => (
      <Typography
        component="label"
        htmlFor={htmlFor}
        className={className}
        variant="body2"
        fontWeight="medium"
      >
        {children}
      </Typography>
    ),

    Box: ({ className, sx, children, ...props }) => (
      <Box className={className} sx={sx} {...props}>
        {children}
      </Box>
    ),

    Paper: ({ className, elevation, children }) => (
      <Paper className={className} elevation={elevation || 3}>
        {children}
      </Paper>
    ),

    Popover: ({ open, anchorEl, onClose, anchorOrigin, children }) => (
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={
          anchorOrigin || { vertical: 'bottom', horizontal: 'left' }
        }
      >
        {children}
      </Popover>
    ),

    MenuItem: ({ className, onClick, children }) => (
      <MenuItem className={className} onClick={onClick}>
        {children}
      </MenuItem>
    ),

    Typography: ({ className, variant, color, children }) => (
      <Typography className={className} variant={variant} color={color}>
        {children}
      </Typography>
    ),

    IconButton: ({ className, size, onClick, children, ...props }) => (
      <IconButton
        className={className}
        size={size}
        onClick={onClick}
        {...props}
      >
        {children}
      </IconButton>
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
            views={views}
            {...props}
          />
        )
      : undefined,

    TextField: TextField
      ? ({ inputRef, inputProps, label, id, error, helperText, ...props }) => (
          <TextField
            inputRef={inputRef}
            inputProps={inputProps}
            label={label}
            id={id}
            error={!!error}
            helperText={helperText}
            {...props}
            fullWidth
            variant="outlined"
          />
        )
      : undefined,
  };
};

/**
 * Example usage instructions:
 * 
 * import {
 *   Box,
 *   Button,
 *   Checkbox,
 *   FormControl,
 *   FormControlLabel,
 *   FormHelperText,
 *   IconButton,
 *   MenuItem,
 *   Paper,
 *   Popover,
 *   Radio,
 *   RadioGroup,
 *   Switch,
 *   TextField,
 *   Typography,
 * } from '@mui/material';
 * import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
 * 
 * import { createMUIAdapter } from 'dynamic-formik-form/adapters/mui';
 * 
 * export const muiAdapter = createMUIAdapter(
 *   Box,
 *   Button,
 *   Checkbox,
 *   FormControl,
 *   FormControlLabel,
 *   FormHelperText,
 *   IconButton,
 *   MenuItem,
 *   Paper,
 *   Popover,
 *   Radio,
 *   RadioGroup,
 *   Switch,
 *   TextField,
 *   Typography,
 *   DatePicker,
 *   DateTimePicker
 * );
 */

