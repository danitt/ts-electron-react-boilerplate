module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    // Recommended ts/es-lint rules
    'plugin:@typescript-eslint/recommended',
    // Disable ESLint rules conflicting with Prettier
    'prettier/@typescript-eslint',
    // React-Specific rules & overrides
    'plugin:react/recommended',
    // Displays Prettier  errors as ESLint errors - must be last plugin in 'extends' array
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      modules: true,
    },
  },
  rules: {
    'react/prop-types': 'off',
  },
  overrides: [{
    files: ['*.js'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  }],
  settings: {
    react: {
      version: "detect",
    },
  },
}
