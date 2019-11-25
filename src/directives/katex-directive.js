import katex from 'katex';
import renderMathInElement from 'katex/dist/contrib/auto-render.js';

const katexDirective = {
  name: 'katex',
  directive: function(el, binding) {
    if (binding.arg && binding.arg === 'auto') {
      const options = (binding.value && binding.value.options) || {};
      renderMathInElement(el, options);
    } else {
      const expression = binding.value.expression || binding.value;
      const additionalOptions = binding.value.options || {};

      const options = Object.assign(
          {
            displayMode: binding.arg === 'display',
          },
          additionalOptions
      );

      katex.render(expression, el, options);
    }
  },
};
export default katexDirective;
