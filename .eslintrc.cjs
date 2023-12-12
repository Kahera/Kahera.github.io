/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    // "plugin:vue/base",
    // "plugin:vue/vue3-essential",
    // "plugin:vue/vue3-strongly-recommended",
    "plugin:vue/vue3-recommended", // Covers the above 3
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module'
  }
}
