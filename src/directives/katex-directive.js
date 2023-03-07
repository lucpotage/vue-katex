import katex from 'katex'
import renderMathInElement from 'katex/dist/contrib/auto-render.js';
import deepmerge from 'deepmerge';

const katexDirective = (globalOptions) => ({
  name: 'katex',
  directive: function(el, binding) {
    const argOptions = (binding.value && binding.value.options) || {};
    const allOptions = deepmerge(globalOptions, argOptions);

    if (binding.arg && binding.arg === 'auto') {
      renderMathInElement(el, allOptions);
    } else {
      const expression = binding.value.expression || binding.value;
      const displayMode = {};
      if (binding.arg === 'display') {
        displayMode.displayMode = true;
      }
      const options = deepmerge(allOptions, displayMode);

      katex.render(expression, el, options);
    }
  },
});
export default katexDirective;
