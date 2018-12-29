import katexDirective from './directives/katex-directive';
import KatexElement from './components/KatexElement.vue';

const plugin = {
  install(Vue) {
    Vue.directive(katexDirective.name, katexDirective.directive);
    Vue.component(KatexElement.name, KatexElement);
  },
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;
