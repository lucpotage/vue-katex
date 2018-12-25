module.exports = {
  input: 'src/plugin.js',
  plugins: ['vue'],
  format: [
    'cjs',
    'umd',
    'es',
  ],
  external: [
    'katex',
  ],
  globals: {
    'katex': 'katex',
  },
};
