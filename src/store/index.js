import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'


let modules = {
  user
}

Vue.use(Vuex)
export default new Vuex.Store({
  modules
})
