// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from "axios"
import MintUI from 'mint-ui'
import '../static/reset.css'
import 'mint-ui/lib/style.css'
import "./config";

Vue.use(MintUI)

window.axios = axios

window.MessageBox = MintUI.MessageBox
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
