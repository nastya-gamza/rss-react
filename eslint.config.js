import js from '@eslint/js';
import globals from 'globals';
import tsEslint from 'typescript-eslint';
import eslintReact from 'eslint-plugin-react';
import eslintPluginReactCompiler from 'eslint-plugin-react-compiler';
import eslintReactRefresh from 'eslint-plugin-react-refresh';
import prettierPlugin from 'eslint-plugin-prettier';
import tsParser from '@typescript-eslint/parser';

export default tsEslint.config(
  {
    plugins: {
      '@typescript-eslint': tsEslint.plugin,
      react: eslintReact,
      'react-refresh': eslintReactRefresh,
      'react-compiler': eslintPluginReactCompiler,
      prettier: prettierPlugin,
      parser: tsParser,
    },
  },
  {
    ignores: ['dist', 'node_modules', 'eslint.config.js', 'build'],
  },
  js.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      'react-compiler/react-compiler': 'error',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
);
