import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import katexDirective from '@/directives/katex-directive'
import katex from 'katex'
import renderMathInElement from 'katex/dist/contrib/auto-render.mjs'

vi.mock('katex')
vi.mock('katex/dist/contrib/auto-render.mjs')

const vKatex = katexDirective({})

const testComponent = {
  template: '<div v-katex="expression"></div>',
  props: ['expression'],
}
const testComponentDisplay = {
  template: '<div v-katex:display="expression"></div>',
  props: ['expression'],
}

describe('Directive v-katex', () => {
  it('renders katex', () => {
    const expression = '\\frac{a_i}{1+x}'
    const wrapper = mount(testComponent, {
      props: { expression },
      global: {
        directives: {
          katex: vKatex.directive,
        },
      },
    })
    expect(katex.render).toBeCalledWith(expression, wrapper.element, {})
  })
  it('renders katex in display mode', () => {
    const expression = '\\frac{a_i}{1+x}'
    const wrapper = mount(testComponentDisplay, {
      props: { expression },
      global: {
        directives: {
          katex: vKatex.directive,
        },
      },
    })
    expect(katex.render).toBeCalledWith(expression, wrapper.element, { displayMode: true })
  })
  it('renders katex in display mode with options', () => {
    const expression = '\\frac{a_i}{1+x}'
    const wrapper = mount(testComponentDisplay, {
      props: {
        expression: {
          expression,
          options: { throwOnError: false },
        },
      },
      global: {
        directives: {
          katex: vKatex.directive,
        },
      },
    })
    expect(katex.render).toBeCalledWith(expression, wrapper.element, {
      displayMode: true,
      throwOnError: false,
    })
  })
  it('renders with auto mode', () => {
    const component = {
      template: `
          <div v-katex:auto>
           \\(\\frac{a_i}{1+x}\\)
          </div>
        `,
    }
    const wrapper = mount(component, {
      global: {
        directives: {
          katex: vKatex.directive,
        },
      },
    })
    expect(renderMathInElement).toBeCalledTimes(1)
    expect(renderMathInElement).toBeCalledWith(wrapper.element, {})
  })
  it('respects global options', () => {
    const expression = '\\frac{a_i}{1+x}'
    const options = {
      displayMode: true,
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true },
      ],
    }
    const globalVKatex = katexDirective()
    const wrapper = mount(testComponent, {
      props: {
        expression: {
          expression,
          options,
        },
      },
      global: {
        directives: {
          katex: globalVKatex.directive,
        },
      },
    })
    expect(katex.render).toBeCalledWith(expression, wrapper.element, options)
  })
  it('merges global options', () => {
    expect(renderMathInElement).toBeCalledTimes(1)
    const component = {
      template: `
          <div v-katex:auto="{options}">
           \\(\\frac{a_i}{1+x}\\)
          </div>
        `,
      data() {
        return {
          options: {
            delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '\\(', right: '\\)', display: true },
              { left: '\\[', right: '\\]', display: true },
            ],
          },
        }
      },
    }
    const globalVKatex = katexDirective({
      displayMode: true,
      delimiters: [{ left: '||', right: '||', display: false }],
    })
    const wrapper = mount(component, {
      global: {
        directives: {
          katex: globalVKatex.directive,
        },
      },
    })
    expect(renderMathInElement).toBeCalledTimes(2)
    expect(renderMathInElement).toBeCalledWith(wrapper.element, {
      displayMode: true,
      delimiters: [
        { left: '||', right: '||', display: false },
        { left: '$$', right: '$$', display: true },
        { left: '\\(', right: '\\)', display: true },
        { left: '\\[', right: '\\]', display: true },
      ],
    })
  })
})
