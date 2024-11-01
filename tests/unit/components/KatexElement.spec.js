import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import KatexElement from '@/components/KatexElement.vue'
import VueKatex from '@/plugin.js'
import katex from 'katex'

describe('KatexElement.vue', () => {
  it('matches snapshot - inline mode', () => {
    const wrapper = mount(KatexElement, {
      props: {
        expression: '\\frac{a_i}{1+x}',
      },
      global: {
        plugins: [VueKatex],
      },
      shallow: true,
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot - display mode', () => {
    const wrapper = mount(KatexElement, {
      props: {
        expression: '\\frac{a_i}{1+x}',
        displayMode: true,
      },
      global: {
        plugins: [VueKatex],
      },
      shallow: true,
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('respects global options', () => {
    const wrapper = mount(KatexElement, {
      props: {
        expression: '\\frac{a_i}{1+x}',
      },
      global: {
        plugins: [
          [
            VueKatex,
            {
              globalOptions: {
                macros: {
                  '\\blah': '\\frac{#}{#}',
                },
              },
            },
          ],
        ],
        shallow: true,
      },
    })

    const options = wrapper.vm.options
    expect(options).toMatchObject({
      macros: {
        '\\blah': '\\frac{#}{#}',
      },
    })
  })

  it('merges global options', () => {
    const wrapper = mount(KatexElement, {
      props: {
        expression: '\\frac{a_i}{1+x}',
        displayMode: true,
        errorColor: '#fff',
        macros: {
          '\\blahblah': '\\frac{#}{#}',
        },
      },
      global: {
        plugins: [
          [
            VueKatex,
            {
              globalOptions: {
                displayMode: false,
                errorColor: '#000',
                macros: {
                  '\\blah': '\\frac{#}{#}',
                },
              },
            },
          ],
        ],
        shallow: true,
      },
    })

    const options = wrapper.vm.options
    expect(options).toMatchObject({
      macros: {
        '\\blah': '\\frac{#}{#}',
        '\\blahblah': '\\frac{#}{#}',
      },
      displayMode: true,
      errorColor: '#fff',
    })
  })

  it('props are mapped to options', () => {
    const displayMode = true
    const throwOnError = true
    const errorColor = '#ffffff'
    const macros = { '\\RR': '\\mathbb{R}' }
    const colorIsTextColor = true
    const maxSize = 100
    const maxExpand = 100
    const allowedProtocols = ['http', 'https']
    const strict = false

    const wrapper = mount(KatexElement, {
      props: {
        expression: '\\frac{a_i}{1+x}',
        displayMode,
        throwOnError,
        errorColor,
        macros,
        colorIsTextColor,
        maxSize,
        maxExpand,
        allowedProtocols,
        strict,
      },
      global: {
        plugins: [VueKatex],
        shallow: true,
      },
    })

    const options = wrapper.vm.options
    expect(options).toMatchObject({
      displayMode,
      throwOnError,
      errorColor,
      macros,
      colorIsTextColor,
      maxSize,
      maxExpand,
      allowedProtocols,
      strict,
    })
  })

  it('has correct root element - inline mode', () => {
    const wrapper = mount(KatexElement, {
      props: { expression: '\\frac{a_i}{1+x}' },
      global: {
        plugins: [VueKatex],
      },
    })
    expect(wrapper.find('span').exists()).toBe(true)
  })

  it('has correct root element - display mode', () => {
    const wrapper = mount(KatexElement, {
      props: {
        expression: '\\frac{a_i}{1+x}',
        displayMode: true,
      },
      global: {
        plugins: [VueKatex],
        shallow: true,
      },
    })
    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.html().substring(0, 4)).toBe('<div')
  })

  it('matches katex renderToString', () => {
    const expression = '\\frac{a_i}{1+x}'
    const wrapper = mount(KatexElement, {
      props: {
        expression,
      },
      global: {
        plugins: [VueKatex],
      },
    })
    const expectedInnerHtml = katex.renderToString(expression)
    expect(wrapper.html()).toContain(expectedInnerHtml)
  })
})
