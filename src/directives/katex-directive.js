import katex from 'katex';
import renderMathInElement from 'katex/dist/contrib/auto-render.js';
const merge = require('deepmerge');

const katexDirective = (globalOptions) => ({
  name: 'katex',
  directive: function(el, binding) {
    const argOptions = (binding.value && binding.value.options) || {};
    const allOptions = merge(globalOptions, argOptions);

    if (binding.arg && binding.arg === 'auto') {
      renderMathInElement(el, allOptions);
    } else {
      const expression = binding.value.expression || binding.value;
      const displayMode = {};
      if (binding.arg === 'display') {
        displayMode.displayMode = true;
      }
      const options = merge(allOptions, displayMode);

      katex.render(expression, el, options);
    }
  },
});
export default katexDirective;
