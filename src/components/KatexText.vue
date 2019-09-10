<script>
import renderMathInElement from 'katex/dist/contrib/auto-render.mjs';
import 'katex/dist/katex.min.css';

export default {
  name: 'KatexText',
  props: {
    value: {
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
    delimiters: {
      type: Array,
    },
    ignoredTags: {
      type: Array,
    },
    ignoredClasses: {
      type: Array,
    },
    errorCallback: {
      type: Object,
    },
    preProcess: {
      type: Object,
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
          delimiters: this.delimiters,
          ignoredTags: this.ignoredTags,
          ignoredClasses: this.ignoredClasses,
          errorCallback: this.errorCallback,
          preProcess: this.preProcess,
        });
    },
  },
  updated() {
    this.$nextTick(function () {
      renderMathInElement(this.$el, this.options);
    });
  },
  mounted() {
    this.$nextTick(function () {
      renderMathInElement(this.$el, this.options);
    });
  },
  render(h) {
    const element = this.displayMode ? 'div' : 'span';
    return h(element, {
      domProps: {
        innerHTML: this.value,
      },
    });
  },
};
</script>
