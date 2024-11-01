import { describe, expect, it } from 'vitest'
import { createApp, inject } from 'vue'
import { mount } from '@vue/test-utils'
import VueKatex from '@/plugin.js'

describe('plugin.js', () => {
  it('registers components and directives', () => {
    const app = createApp({
      template: '<div></div>',
    })
    app.use(VueKatex)
    expect(app.directive('katex')).toBeTruthy()
    expect(app.component('KatexElement').name).toBe('KatexElement')
  })

  it('installs $katexOptions', () => {
    const TestComponent =       {
      name: 'TestComponent',
      setup: () => {
        const options = inject('$katexOptions')
        return {
          options,
        }
      },
      template: '<div>Empty - {{ options.someThing }}</div>',
    }


    const wrapper = mount(TestComponent,
      {
        shallow: true,
        global: {
          plugins: [[VueKatex, { globalOptions: { someThing: 'weird', message: 'working' } }]],
        },
      }
    )

    expect(wrapper.html()).toBe('<div>Empty - weird</div>')
  })
})
