// import {defineComponent} from 'vue';
// import {mount} from '@vue/test-utils';
// import VueKatex from '@/plugin.js';

// const App = defineComponent({
// name: 'TestApp',
// });

// describe('plugin.js', () => {
//   it('registers components and directives', () => {
//     const wrapper = mount(App, {
//       global: {
//         plugins: [VueKatex],
//       },
//     });
//     const {components, directives} = wrapper.options;
//     expect(components.KatexElement).toBeTruthy();
//     expect(directives.katex).toBeTruthy();
//     expect(wrapper).toBeTruthy();
//   });

//   it('installs $katexOptions', () => {
//     const wrapper = mount(App, {
//       global: {
//         plugins: [VueKatex],
//       },
//     });
//     expect(wrapper.prototype.$katexOptions).toBeTruthy();
//     expect(wrapper.prototype.$katexOptions.someOption).toBeTruthy();
//     expect(wrapper).toBeTruthy();
//   });
// });
