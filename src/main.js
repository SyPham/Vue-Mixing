// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//Socket IO
import VueSocketIO from 'vue-socket.io'
// Element Ui
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/vi'
import 'element-ui/lib/theme-chalk/index.css'

// App
import App from './App'

// Vue Router
import router from './router'

// Vuex: for services, shared components, etc
import store from './store/index'

// Our Style
import '../static/style.css'

// import VueMoment from 'vue-moment'

Vue.config.productionTip = false

Vue.use(Element, {
  locale
})

// Vue.use(require('vue-moment'));
// Vue.use(VueMoment, {
//   moment,
// })

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://10.4.2.186:3485/',
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
  //options: { path: "/my-app/" } //Optional options
}))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
