import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import bicycle from './modules/bicycle'
import order from './modules/order'
import list from './modules/list'


let modules = {
  user,
  bicycle,
  order,
  list
}

Vue.use(Vuex)
export default new Vuex.Store({
  modules
})
