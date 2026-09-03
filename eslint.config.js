import js from '@eslint/js';
import daStyle from 'eslint-config-dicodingacademy';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist', 'node_modules', 'coverage', 'storybook-static'] },
  js.configs.recommended,
  daStyle,
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.vite,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: { ecmaVersion: 2022, globals: { ...globals.browser, ...globals.node }, parserOptions: { ecmaVersion: 'latest', ecmaFeatures: { jsx: true }, sourceType: 'module' } },
    rules: { 'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^[A-Z]' }], 'quotes': ['error', 'single', { avoidEscape: true }], 'semi': ['error', 'always'] },
  },
  {
    files: ['**/*.{test,spec}.{js,jsx}', 'cypress/**/*.js'],
    languageOptions: { globals: { ...globals.browser, ...globals.node, ...globals.jest, cy: 'readonly', Cypress: 'readonly' } },
  },
];
