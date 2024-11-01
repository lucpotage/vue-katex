import vue from 'rollup-plugin-vue'
import commonjs from '@rollup/plugin-commonjs'
import buble from '@rollup/plugin-buble'
import terser from '@rollup/plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: 'src/plugin.js',
  external: [
    'katex',
    'katex/dist/contrib/auto-render.mjs',
    'katex/dist/contrib/copy-tex.mjs',
    'katex/dist/contrib/mathtex-script-type.mjs',
    'katex/dist/contrib/mhchem.mjs',
    'katex/dist/contrib/render-a11y-string.mjs',
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
      name: 'vue3-katex',
      file: 'dist/vue3-katex.umd.js',
      format: 'umd',
      globals: {
        vue: 'vue',
        katex: 'katex',
        'katex/dist/contrib/auto-render.mjs': 'renderMathInElement',
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
    nodeResolve(),
  ],
}
