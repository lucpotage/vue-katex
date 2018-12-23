import {createLocalVue, mount} from '@vue/test-utils';
import VueKatex from '@/lib';

const localVue = createLocalVue();
localVue.use(VueKatex);

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
      propsData: {katex: {expression: '\\frac{a_i}{1+x}', options: {throwOnError: false}}},
    });
    const children = wrapper.findAll('span');
    const firstChild = children.at(0);
    const secondChild = children.at(1);
    expect(firstChild.classes()).toContain('katex-display');
    expect(secondChild.classes()).toContain('katex');
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
});
