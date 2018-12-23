import katex from 'katex';

const plugin = {
  install(Vue) {
    Vue.directive('katex', function(el, binding) {
      const displayStyle = binding.arg === 'display' ? true : false;

      if (binding.value.expression) {
        if (binding.value.options) {
          katex.render(binding.value.expression, el, Object.assign(
              {displayMode: displayStyle},
              binding.value.options
          ));
        } else {
          katex.render(binding.value.expression, el, {
            displayMode: displayStyle,
          });
        }
      } else {
        katex.render(binding.value, el, {
          displayMode: displayStyle,
        });
      }
    });
  },
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;
