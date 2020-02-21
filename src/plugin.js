import katexDirective from './directives/katex-directive';
import KatexElement from './components/KatexElement.vue';

const plugin = {
  install(Vue, options) {
    const globalOptions = (options && options.globalOptions) || {};
    const vKatex = katexDirective(globalOptions);
    Vue.directive(vKatex.name, vKatex.directive);
    Vue.component(KatexElement.name, KatexElement);

    Vue.prototype.$katexOptions = globalOptions;
  },
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;
