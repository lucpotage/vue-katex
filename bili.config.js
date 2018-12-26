module.exports = {
  input: 'src/plugin.js',
  plugins: [
    'vue',
  ],
  format: [
    'cjs-min',
    'umd-min',
    'es-min',
  ],
  external: [
    'katex',
  ],
  globals: {
    'katex': 'katex',
  },
};
