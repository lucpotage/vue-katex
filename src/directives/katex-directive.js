import katex from 'katex';

const katexDirective = {
  name: 'katex',
  directive: function(el, binding) {
    const expression = binding.value.expression || binding.value;
    const additionalOptions = binding.value.options || {};

    const options = Object.assign({
      displayMode: binding.arg === 'display',
    },
    additionalOptions);

    katex.render(expression, el, options);
  },
};
export default katexDirective;
