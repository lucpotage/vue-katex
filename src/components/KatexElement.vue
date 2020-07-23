<script>
import katex from 'katex';
const merge = require('deepmerge');

const removeUndefined = (obj) =>{
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] !== 'undefined') {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

export default {
  name: 'KatexElement',
  props: {
    expression: {
      type: String,
      default: '',
      required: true,
    },
    displayMode: {
      type: Boolean,
      default: undefined,
    },
    throwOnError: {
      type: Boolean,
      default: undefined,
    },
    errorColor: {
      type: String,
      default: undefined,
    },
    macros: {
      type: Object,
      default: undefined,
    },
    colorIsTextColor: {
      type: Boolean,
      default: undefined,
    },
    maxSize: {
      type: Number,
      default: undefined,
    },
    maxExpand: {
      type: Number,
      default: undefined,
    },
    allowedProtocols: {
      type: Array,
      default: undefined,
    },
    strict: {
      type: [Boolean, String, Function],
      default: undefined,
    },
  },
  computed: {
    options() {
      return merge(
          this.$katexOptions,
          removeUndefined({
            displayMode: this.displayMode,
            throwOnError: this.throwOnError,
            errorColor: this.errorColor,
            macros: this.macros,
            colorIsTextColor: this.colorIsTextColor,
            maxSize: this.maxSize,
            maxExpand: this.maxExpand,
            allowedProtocols: this.allowedProtocols,
            strict: this.strict,
          }),
      );
    },
    math() {
      return katex.renderToString(this.expression, this.options);
    },
  },
  render(h) {
    const element = this.displayMode ? 'div' : 'span';
    return h(element, {
      domProps: {
        innerHTML: this.math,
      },
    });
  },
};
</script>
