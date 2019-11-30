import {createLocalVue} from '@vue/test-utils';
import VueKatex from '@/plugin.js';

const vueInNodeEnv = (options) => {
  const localVue = createLocalVue();
  localVue.use(VueKatex, options);
  return localVue;
};

describe('plugin.js', () => {
  it('registers components and directives', ()=>{
    const {components, directives} = vueInNodeEnv().options;
    expect(components.KatexElement).toBeTruthy();
    expect(directives.katex).toBeTruthy();
  });

  it('installs $katexOptions', () => {
    const localVue = vueInNodeEnv({
      globalOptions: {
        someOption: 'woo!',
      },
    });
    expect(localVue.prototype.$katexOptions).toBeTruthy();
    expect(localVue.prototype.$katexOptions.someOption).toBeTruthy();
  });

  it('provides v-katex with globals', ()=>{
    const vKatex = require('@/directives/katex-directive');
    const vKatexSpy = jest.spyOn(vKatex, 'default');

    const globalOptions = {
      someOption: 'woo!',
      anotherOne: 'woop',
    };
    vueInNodeEnv({
      globalOptions,
    });
    expect(vKatexSpy).toBeCalledWith(globalOptions);
  });
});
