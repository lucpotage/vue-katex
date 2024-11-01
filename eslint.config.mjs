import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import { includeIgnoreFile } from '@eslint/compat'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

export default [
  ...pluginVue.configs['flat/recommended'],
  includeIgnoreFile(gitignorePath),
  {
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.node,
      },
    },
    files: ['**/*.js', '**/*.vue'],
    rules: {
      'vue/no-v-text-v-html-on-component': 'off',
      'vue/max-attributes-per-line': 'off',
    },
  },
]
