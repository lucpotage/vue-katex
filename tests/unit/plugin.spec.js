import {describe, it, expect, vi} from 'vitest';
import {createLocalVue} from '@vue/test-utils';
import VueKatex from '@/vite-plugin-katex.js';

const vueInNodeEnv = (options) => {
  const localVue = createLocalVue();
  localVue.use(VueKatex, options);
  return localVue;
};

describe('vite-plugin-katex.js', () => {
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

  it('provides v-katex with globals', async () => {
    const vKatex = await import('@/directives/katex-directive.js');
    const vKatexSpy = vi.spyOn(vKatex, 'default');

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
