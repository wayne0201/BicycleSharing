import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import bicycle from './modules/bicycle'
import order from './modules/order'


let modules = {
  user,
  bicycle,
  order
}

Vue.use(Vuex)
export default new Vuex.Store({
  modules
})
