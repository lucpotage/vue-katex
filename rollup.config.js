import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import {terser} from 'rollup-plugin-terser';

export default {
  input: 'src/plugin.js',
  external: [
    'vue',
    'katex',
    'katex/dist/contrib/auto-render.js',
  ],
  output: [
    {
      file: 'dist/vue-katex.cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/vue-katex.es.js',
      format: 'esm',
    },
    {
      name: 'VueKatex',
      file: 'dist/vue-katex.umd.js',
      format: 'umd',
      globals: {
        'katex': 'katex',
        'katex/dist/contrib/auto-render.js': 'renderMathInElement',
      },
    },
  ],
  plugins: [
    commonjs(),
    vue({
      compileTemplate: true,
    }),
    buble(),
    terser(),
  ],
};
