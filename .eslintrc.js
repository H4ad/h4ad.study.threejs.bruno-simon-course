module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react-hooks', 'import', '@emotion', 'unused-imports'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:react/recommended',
  ],
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  settings: {
    'react': {
      version: 'detect',
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'jsx-quotes': [2, 'prefer-double'],
    'quotes': ['warn', 'single'],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',

    // Opt-in
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'unused-imports/no-unused-imports-ts': 'error',

    // Opt-out
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/prop-types': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/jsx-indent': 'off',
    'react/display-name': 'off',
    'react/no-children-prop': 'off',

    // Remove restriction on `ForOfStatement` as it's just a highly opinionated rule that doesn't have much merit
    // see https://github.com/airbnb/javascript/issues/1271 for more info
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],

    // Configure
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],

    'import/order': 'off',

    // line spacing
    'padding-line-between-statements': [
      'error',
      // wildcard inclusions
      {
        blankLine: 'always',
        prev: ['multiline-block-like', 'multiline-const', 'multiline-expression'],
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: ['multiline-block-like', 'multiline-const', 'multiline-expression', 'switch', 'return'],
      },
      // specific exclusions for case statements
      { blankLine: 'never', prev: 'case', next: 'multiline-block-like' },
      { blankLine: 'never', prev: 'multiline-block-like', next: 'case' },
    ],
  },
  overrides: [
    {
      files: '**/*.{stories,test}.tsx',
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
    // Cypress
    {
      files: 'cypress/**',
      rules: {
        'jest/expect-expect': 'off',
      },
    },
  ],
};
