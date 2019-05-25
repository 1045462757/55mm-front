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

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { getCookie } from "@/utils/cookie.js";

// import 'animate.css'
// import 'font-awesome/css/font-awesome.min.css'


Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.globalApi = globalApi
Vue.use(VueResource)
Vue.use(iView);
Vue.use(VueQuillEditor)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (getCookie("userInfo") != "") {
      iView.LoadingBar.start();
      next();
    } else {
      next({
        //提示
        path: '/main',
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
