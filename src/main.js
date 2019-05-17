// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(VueResource);
Vue.use(VueAxios);
Vue.use(ElementUI);
Vue.prototype.axios=axios;
Vue.prototype.qs = qs;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
