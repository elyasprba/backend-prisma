import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'no-console': 'error',
    },
  },
  {
    languageOptions: { globals: globals.node },
    ...tseslint.configs.recommended,
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
