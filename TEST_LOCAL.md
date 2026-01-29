# Testing the Package Locally

Before publishing to npm, you can test the package locally using one of these methods:

## Method 1: Using npm link (Recommended for Development)

This creates a symlink so changes in the package are immediately reflected in your test project.

### Step 1: Link the package
```bash
# In the dynamic-form directory
npm run build
npm link
```

### Step 2: Create a test project (or use existing)
```bash
mkdir test-project
cd test-project
npm init -y
npm install react react-dom formik yup
npm install --save-dev @types/react @types/react-dom typescript vite @vitejs/plugin-react
```

### Step 3: Link to the package
```bash
# In your test project directory
npm link dynamic-formik-form
```

### Step 4: Use the package
```typescript
import { DynamicForm } from 'dynamic-formik-form';
// ... use it in your component
```

### Step 5: Unlink when done
```bash
# In test project
npm unlink dynamic-formik-form

# In package directory
npm unlink
```

## Method 2: Using npm pack (Recommended for Final Testing)

This creates a tarball exactly as it would be published, perfect for final testing.

### Step 1: Build and pack
```bash
# In the dynamic-form directory
npm run build
npm pack
```

This creates a file like `dynamic-formik-form-0.1.0.tgz`

### Step 2: Install in test project
```bash
# In your test project
npm install ../dynamic-form/dynamic-formik-form-0.1.0.tgz
```

Or if you've moved the tarball:
```bash
npm install ./dynamic-formik-form-0.1.0.tgz
```

## Method 3: Using the Included Test Project

We've included a ready-to-use test project in the `test-local/` directory.

### Step 1: Build the package
```bash
# In the dynamic-form directory
npm run build
npm link
```

### Step 2: Set up test project
```bash
cd test-local
npm install
npm link dynamic-formik-form
```

### Step 3: Run the test app
```bash
npm run dev
```

This will start a Vite dev server where you can test the package.

### Step 4: Clean up
```bash
npm unlink dynamic-formik-form
cd ..
npm unlink
```

## What to Test

1. ✅ **Basic form rendering** - All field types render correctly
2. ✅ **Form validation** - Yup validation works
3. ✅ **Form submission** - Formik onSubmit is called
4. ✅ **Field interactions** - Input changes update formik values
5. ✅ **Error display** - Validation errors show correctly
6. ✅ **Conditional fields** - Child fields work correctly
7. ✅ **Custom UI library** - If testing with MUI/Bootstrap
8. ✅ **TypeScript types** - Types are correctly exported

## Troubleshooting

### Module not found errors
- Make sure you've run `npm run build` first
- Check that `dist/` folder exists with built files
- Verify the package name matches in both package.json files

### Type errors
- Ensure TypeScript can find the type definitions
- Check that `dist/index.d.ts` exists

### React version conflicts
- Make sure test project uses compatible React version (>=18.0.0)
- Check peer dependencies match

## Ready to Publish?

Once all tests pass:

1. Update version in `package.json` if needed
2. Add repository URL if you have one
3. Run `npm run build` one final time
4. Run `npm publish --access public` (or `npm publish` if scoped)

