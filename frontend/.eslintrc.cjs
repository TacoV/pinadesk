module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript'
  ],
  parserOptions: {
    ecmaVersion: 2022
  },
  rules: {
    'vue/multi-word-component-names': 'off'
  }
}