import {createLocalVue, mount} from '@vue/test-utils';
import katexDirective from '@/directives/katex-directive';
import katex from 'katex';
import renderMathInElement from 'katex/dist/contrib/auto-render.js';

jest.mock('katex');
jest.mock('katex/dist/contrib/auto-render.js');

const localVue = createLocalVue();
const vKatex = katexDirective({});
localVue.directive(vKatex.name, vKatex.directive);

const testComponent = {
  template: '<div v-katex="expression"></div>',
  props: ['expression'],
};
const testComponentDisplay = {
  template: '<div v-katex:display="expression"></div>',
  props: ['expression'],
};

describe('Directive v-katex', () => {
  it('renders katex', () => {
    const expression = '\\frac{a_i}{1+x}';
    const wrapper = mount(testComponent, {
      localVue,
      propsData: {expression},
    });
    expect(katex.render).toBeCalledWith(expression, wrapper.element, {});
  });

  it('renders katex in display mode', () => {
    const expression = '\\frac{a_i}{1+x}';
    const wrapper = mount(testComponentDisplay, {
      localVue,
      propsData: {expression},
    });
    expect(katex.render).toBeCalledWith(expression, wrapper.element, {displayMode: true});
  });

  it('renders katex in display mode with options', () => {
    const expression = '\\frac{a_i}{1+x}';
    const wrapper = mount(testComponentDisplay, {
      localVue,
      propsData: {
        expression: {
          expression,
          options: {throwOnError: false},
        },
      },
    });

    expect(katex.render).toBeCalledWith(expression, wrapper.element, {
      displayMode: true,
      throwOnError: false,
    });
  });

  it('renders with auto mode', () => {
    const component = {
      template: `
        <div v-katex:auto>
         \\(\\frac{a_i}{1+x}\\)
        </div>
      `,
    };
    const wrapper = mount(component, {
      localVue,
    });
    expect(renderMathInElement).toBeCalledWith(wrapper.element, {});
  });

  it('respects global options', () => {
    const expression = '\\frac{a_i}{1+x}';
    const miniLocalVue = createLocalVue();
    const options = {
      displayMode: true,
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '\\(', right: '\\)', display: false},
        {left: '\\[', right: '\\]', display: true},
      ],
    };
    const globalVKatex = katexDirective();
    miniLocalVue.directive(globalVKatex.name, globalVKatex.directive);
    const wrapper = mount(testComponent, {
      localVue: miniLocalVue,
      propsData: {
        expression: {
          expression,
          options,
        },
      },
    });

    expect(katex.render).toBeCalledWith(expression, wrapper.element, options);
  });

  it('merges global options', () => {
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
              {left: '$$', right: '$$', display: true},
              {left: '\\(', right: '\\)', display: true},
              {left: '\\[', right: '\\]', display: true},
            ],
          },
        };
      },
    };
    const miniLocalVue = createLocalVue();
    const globalVKatex = katexDirective({
      displayMode: true,
      delimiters: [
        {left: '||', right: '||', display: false},
      ],
    });
    miniLocalVue.directive(globalVKatex.name, globalVKatex.directive);
    const wrapper = mount(component, {
      localVue: miniLocalVue,
    });

    expect(renderMathInElement).toBeCalledWith(wrapper.element, {
      displayMode: true,
      delimiters: [
        {left: '||', right: '||', display: false},
        {left: '$$', right: '$$', display: true},
        {left: '\\(', right: '\\)', display: true},
        {left: '\\[', right: '\\]', display: true},
      ],
    });
  });
});
