module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    // 'next/core-web-vitals',
    // 'next',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    semi: ['error', 'never'],
    'space-before-function-paren': ['error', 'always'],
    'arrow-parens': ['error', 'as-needed'],
    'class-methods-use-this': ['error', { exceptMethods: ['connect'] }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-plusplus': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
      },
      alias: {
        map: [
          ['@components', './src/components'],
          ['@ui', './src/ui'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
  },
}
