<script>
import katex from 'katex';

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
      default: false,
    },
    throwOnError: {
      type: Boolean,
      default: false,
    },
    errorColor: {
      type: String,
      default: '#cc0000',
    },
    macros: {
      type: Object,
      default: null,
    },
    colorIsTextColor: {
      type: Boolean,
      default: false,
    },
    maxSize: {
      type: Number,
      default: Infinity,
    },
    maxExpand: {
      type: Number,
      default: 1000,
    },
    allowedProtocols: {
      type: Array,
      default: () => (['http', 'https', 'mailto', '_relative']),
    },
    strict: {
      type: [Boolean, String, Function],
      default: 'warn',
    },
  },
  computed: {
    options() {
      return Object.assign({},
          {
            displayMode: this.displayMode,
            throwOnError: this.throwOnError,
            errorColor: this.errorColor,
            macros: this.macros,
            colorIsTextColor: this.colorIsTextColor,
            maxSize: this.maxSize,
            maxExpand: this.maxExpand,
            allowedProtocols: this.allowedProtocols,
            strict: this.strict,
          });
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
