import katexDirective from './directives/katex-directive';
import KatexElement from './components/KatexElement.vue';
import KatexText from './components/KatexText.vue';

const plugin = {
  install(Vue) {
    Vue.directive(katexDirective.name, katexDirective.directive);
    Vue.component(KatexElement.name, KatexElement);
    Vue.component(KatexText.name, KatexText);
  },
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;
