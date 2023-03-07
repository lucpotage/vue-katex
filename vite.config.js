import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue2'
import path from 'path'

export default defineConfig({
  resolve:{
    alias:{
      '@' : path.resolve(__dirname, './src')
    },
  },
  build: {
    lib: {
      entry: '@/vite-plugin-katex.js',
      name: 'VueKatex',
      fileName: (format) => `vite-plugin-katex.${format}.js`
    },
    rollupOptions: {
      input: 'src/vite-plugin-katex.js',
      external: [
        'vue',
        'katex',
        'katex/dist/contrib/auto-render.js',
        'deepmerge'
      ],
      output: {
        globals: {
          'katex': 'katex',
          'katex/dist/contrib/auto-render.js': 'renderMathInElement',
          'deepmerge': 'deepmerge'
        },
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
    
  plugins: [
    vue(),
  ],
});
