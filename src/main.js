import Vue from 'vue';
import App from './App.vue';
import VueKatex from './lib';
import '../node_modules/katex/dist/katex.min.css';
Vue.config.productionTip = false;
Vue.use(VueKatex);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
