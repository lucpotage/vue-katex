<template>
  <component :is="tag" v-html="math" />
</template>

<script>
export default {
  name: 'KatexElement',
}
</script>

<script setup>
import { computed, defineProps, inject, toRefs } from 'vue'
import katex from 'katex'
import merge from 'deepmerge'

const removeUndefined = (obj) => {
  const newObj = {}
  for (const key of Object.keys(obj)) {
    if (typeof obj[key] !== 'undefined') {
      newObj[key] = obj[key]
    }
  }
  return newObj
}

const props = defineProps({
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
})

const {
  displayMode,
  expression,
  throwOnError,
  errorColor,
  macros,
  colorIsTextColor,
  maxSize,
  maxExpand,
  allowedProtocols,
  strict,
} = toRefs(props)

const options = computed(() => {
  return merge(
    inject('$katexOptions'),
    removeUndefined({
      displayMode: displayMode.value,
      throwOnError: throwOnError.value,
      errorColor: errorColor.value,
      macros: macros.value,
      colorIsTextColor: colorIsTextColor.value,
      maxSize: maxSize.value,
      maxExpand: maxExpand.value,
      allowedProtocols: allowedProtocols.value,
      strict: strict.value,
    })
  )
})

const tag = computed(() => {
  return displayMode.value ? 'div' : 'span'
})
const math = computed(() => {
  return katex.renderToString(expression.value, options.value)
})
</script>
