import {createLocalVue, mount} from '@vue/test-utils';
import katexDirective from '@/directives/katex-directive';

const localVue = createLocalVue();
localVue.directive(katexDirective.name, katexDirective.directive);

const testComponent = {
  template: '<div v-katex="katex"></div>',
  props: ['katex'],
};
const testComponentDisplay = {
  template: '<div v-katex:display="katex"></div>',
  props: ['katex'],
};

describe('Directive v-katex', () => {
  it('renders katex', () => {
    const wrapper = mount(testComponent, {
      localVue,
      propsData: {katex: '\\frac{a_i}{1+x}'},
    });
    expect(wrapper.find('span').classes()).toContain('katex');
  });

  it('renders katex in display mode', () => {
    const wrapper = mount(testComponentDisplay, {
      localVue,
      propsData: {katex: '\\frac{a_i}{1+x}'},
    });
    const children = wrapper.findAll('span');
    const firstChild = children.at(0);
    const secondChild = children.at(1);
    expect(firstChild.classes()).toContain('katex-display');
    expect(secondChild.classes()).toContain('katex');
  });

  it('renders katex in display mode with options', () => {
    const wrapper = mount(testComponentDisplay, {
      localVue,
      propsData: {
        katex: {
          expression: '\\frac{a_i}{1+x}',
          options: {throwOnError: false},
        },
      },
    });
    const children = wrapper.findAll('span');
    const firstChild = children.at(0);
    const secondChild = children.at(1);
    expect(firstChild.classes()).toContain('katex-display');
    expect(secondChild.classes()).toContain('katex');
  });

  it('renders with auto mode', ()=>{
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
    expect(wrapper.findAll('span').at(1).classes()).toContain('katex');
  });

  it('renders with auto mode with options', ()=>{
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
    const wrapper = mount(component, {
      localVue,
    });
    expect(wrapper.findAll('span').at(1).classes()).toContain('katex-display');
  });


  it('should match the snapshot', () => {
    const wrapper = mount(testComponent, {
      localVue,
      propsData: {katex: '\\frac{a_i}{1+x}'},
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot in display mode', () => {
    const wrapper = mount(testComponentDisplay, {
      localVue,
      propsData: {katex: '\\frac{a_i}{1+x}'},
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot in display mode with options', () => {
    const wrapper = mount(testComponentDisplay, {
      localVue,
      propsData: {
        katex: {
          expression: '\\frac{a_i}{1+x}',
          options: {throwOnError: false},
        },
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
});
