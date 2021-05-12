module.exports = {
  eslint: {
    configure: {
      extends: ['eslint-config-react-app'],
      plugins: ['prettier', 'react-hooks'],
      rules: {
        'no-unused-vars': 'off',
        'no-redeclare': 'off',
        'prettier/prettier': ['warn'],
        'max-len': ['error', { code: 256, ignoreComments: true, ignorePattern: '^import .*' }],
        'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
        'react/jsx-uses-vars': 'warn',
        // 'react-hooks/exhaustive-deps': 'error',
        'no-plusplus': 'off',
        'no-underscore-dangle': 'off',
        'max-classes-per-file': 'off',
        'class-methods-use-this': 'off',
        'import/prefer-default-export': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'lines-between-class-members': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-wrap-multilines': ['error', { declaration: 'ignore' }],
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/lines-between-class-members': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-use-before-define': 'warn',
        'prefer-destructuring': [
          'warn',
          {
            VariableDeclarator: {
              array: false,
              object: true,
            },
            AssignmentExpression: {
              array: false,
              object: false,
            },
          },
        ],
      },
    },
  },
};
