module.exports = {
  env: {
    node: true,
    commonjs: true,
    es6: true,
    jquery: false,
    jest: true,
    jasmine: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        'func-names': ['error', 'never'],
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
};
