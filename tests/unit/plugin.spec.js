import {createLocalVue, mount} from '@vue/test-utils';
import VueKatex from '@/plugin.js';

const vueInNodeEnv = () => {
  const localVue = createLocalVue();
  localVue.use(VueKatex);
  return localVue;
};

describe('plugin.js', () => {
  it('registers KatexElement', () => {
    const localVue = vueInNodeEnv();
    const wrapper = mount(
        {
          template: '<KatexElement :expression="katex" />',
          props: ['katex'],
        },
        {
          localVue,
          propsData: {katex: '\\frac{a_i}{1+x}'},
        }
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('registers v-katex', () => {
    const localVue = vueInNodeEnv();
    const wrapper = mount(
        {
          template: '<div v-katex="katex"></div>',
          props: ['katex'],
        },
        {
          localVue,
          propsData: {katex: '\\frac{a_i}{1+x}'},
        }
    );
    expect(wrapper.exists()).toBe(true);
  });
});
