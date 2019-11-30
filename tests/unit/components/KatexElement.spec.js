import {shallowMount, mount} from '@vue/test-utils';
import KatexElement from '@/components/KatexElement.vue';
import katex from 'katex';

describe('KatexElement.vue', () => {
  it('matches snapshot - inline mode', () => {
    const wrapper = shallowMount(KatexElement, {
      propsData: {
        expression: '\\frac{a_i}{1+x}',
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
  it('matches snapshot - display mode', () => {
    const wrapper = shallowMount(KatexElement, {
      propsData: {
        expression: '\\frac{a_i}{1+x}',
        displayMode: true,
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('respects global options', () => {
    const wrapper = shallowMount(KatexElement, {
      mocks: {
        $katexOptions: {
          macros: {
            '\\blah': '\\frac{#}{#}',
          },
        },
      },
      propsData: {
        expression: '\\frac{a_i}{1+x}',
      },
    });

    const options = wrapper.vm.options;
    expect(options).toMatchObject({
      macros: {
        '\\blah': '\\frac{#}{#}',
      },
    });
  });

  it('merges global options', () => {
    const wrapper = shallowMount(KatexElement, {
      mocks: {
        $katexOptions: {
          displayMode: false,
          errorColor: '#000',
          macros: {
            '\\blah': '\\frac{#}{#}',

          },
        },
      },
      propsData: {
        expression: '\\frac{a_i}{1+x}',
        displayMode: true,
        errorColor: '#fff',
        macros: {
          '\\blahblah': '\\frac{#}{#}',
        },
      },
    });

    const options = wrapper.vm.options;
    expect(options).toMatchObject({
      macros: {
        '\\blah': '\\frac{#}{#}',
        '\\blahblah': '\\frac{#}{#}',
      },
      displayMode: true,
      errorColor: '#fff',
    });
  });

  it('props are mapped to options', () => {
    const displayMode = true;
    const throwOnError = true;
    const errorColor = '#ffffff';
    const macros = {'\\RR': '\\mathbb{R}'};
    const colorIsTextColor = true;
    const maxSize = 100;
    const maxExpand = 100;
    const allowedProtocols = ['http', 'https'];
    const strict = false;

    const wrapper = shallowMount(KatexElement, {
      propsData: {
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
    });

    const options = wrapper.vm.options;
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
    });
  });

  it('has correct root element - inline mode', () => {
    const wrapper = shallowMount(KatexElement, {
      propsData: {expression: '\\frac{a_i}{1+x}'},
    });
    expect(wrapper.is('span')).toBe(true);
  });

  it('has correct root element - display mode', () => {
    const wrapper = shallowMount(KatexElement, {
      propsData: {
        expression: '\\frac{a_i}{1+x}',
        displayMode: true,
      },
    });
    expect(wrapper.is('div')).toBe(true);
  });

  it('matches katex renderToString', () => {
    const expression = '\\frac{a_i}{1+x}';
    const wrapper = mount(KatexElement, {
      propsData: {
        expression,
      },
    });
    const expectedInnerHtml = katex.renderToString(expression);
    expect(wrapper.html()).toContain(expectedInnerHtml);
  });
});
