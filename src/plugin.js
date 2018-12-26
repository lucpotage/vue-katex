import katexDirective from './directives/katex-directive';

const plugin = {
  install(Vue) {
    Vue.directive(katexDirective.name, katexDirective.directive);
  },
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;
