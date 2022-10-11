import vue from 'rollup-plugin-vue'
import commonjs from '@rollup/plugin-commonjs'
import buble from '@rollup/plugin-buble'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/plugin.js',
  external: [
    'deepmerge',
    'katex',
    'katex/dist/contrib/auto-render.js',
    'vue',
    'vue-dompurify-html',
  ],
  output: [
    {
      file: 'dist/vue3-katex.cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/vue3-katex.es.js',
      format: 'esm',
    },
    {
      name: 'Vue3Katex',
      file: 'dist/vue3-katex.umd.js',
      format: 'umd',
      globals: {
        deepmerge: 'deepmerge',
        katex: 'Katex',
        'katex/dist/contrib/auto-render.js': 'renderMathInElement',
        vue: 'Vue',
        'vue-dompurify-html': 'vue-dompurify-html',
      },
    },
  ],
  plugins: [
    commonjs(),
    vue({
      compileTemplate: true,
    }),
    buble({
      transforms: {
        forOf: false,
      },
    }),
    terser(),
  ],
}
