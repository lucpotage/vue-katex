/**
 * Plugin entry.
 */
import katexDirective from './directives/katex-directive'
import KatexElement from './components/KatexElement.vue'
import VueDOMPurifyHTML from 'vue-dompurify-html'

/**
 * Install function for installing plugin into Vue 3 application.
 *
 * @param {Object} app
 * @param {Object} options
 */
function install(app, options) {
  const globalOptions = (options && options.globalOptions) || {}
  const vKatex = katexDirective(globalOptions)
  app.use(VueDOMPurifyHTML)
  app.directive(vKatex.name, vKatex.directive)
  app.component(KatexElement.name, KatexElement)
  app.provide('$katexOptions', globalOptions)
}

export default install
