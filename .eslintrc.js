module.exports = {
  root: true,
  env: {
    es2022: true,
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    'google',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/component-name-in-template-casing': 0,
    'linebreak-style': 0,
    'max-len': 0,
  },
};
