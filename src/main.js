// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import globalApi from './utils/Api.js'
import VueResource from 'vue-resource'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

import { getCookie } from "@/utils/cookie.js";

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.globalApi = globalApi
Vue.use(VueResource)
Vue.use(iView);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (getCookie("account") != "") {
      iView.LoadingBar.start();
      next();
    } else {
      next({
        //提示
      })
    }
  } else {
    iView.LoadingBar.start();
    next();
  }
});

router.afterEach(route => {
  iView.LoadingBar.finish();
});
