import js from '@eslint/js';
import globals from 'globals';
import tsEslint from 'typescript-eslint';
import eslintReact from 'eslint-plugin-react';
import eslintPluginReactCompiler from 'eslint-plugin-react-compiler';
import eslintReactRefresh from 'eslint-plugin-react-refresh';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintPluginJest from 'eslint-plugin-jest';
import tsParser from '@typescript-eslint/parser';

export default tsEslint.config(
  {
    plugins: {
      '@typescript-eslint': tsEslint.plugin,
      react: eslintReact,
      'react-refresh': eslintReactRefresh,
      'react-compiler': eslintPluginReactCompiler,
      prettier: prettierPlugin,
      jest: eslintPluginJest,
      parser: tsParser,
    },
  },
  {
    ignores: ['dist', 'node_modules', 'eslint.config.js', 'build', 'coverage'],
  },
  js.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
  },
  {
    files: ['**/*.{js, ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      'react-compiler/react-compiler': 'error',
      '@typescript-eslint/no-var-requires': 0,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
);
