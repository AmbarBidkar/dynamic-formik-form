#!/bin/bash
# Script to test the package locally before publishing

echo "🔨 Building package..."
npm run build

echo "📦 Creating package tarball..."
npm pack

echo "✅ Package tarball created!"
echo ""
echo "To test locally:"
echo "1. Create a test project: mkdir test-project && cd test-project"
echo "2. Initialize: npm init -y"
echo "3. Install dependencies: npm install react react-dom formik yup"
echo "4. Install local package: npm install ../dynamic-form/dynamic-formik-form-0.1.0.tgz"
echo "5. Create a test file and import: import { DynamicForm } from 'dynamic-formik-form'"
echo ""
echo "Or use npm link:"
echo "1. In this directory: npm link"
echo "2. In your test project: npm link dynamic-formik-form"

