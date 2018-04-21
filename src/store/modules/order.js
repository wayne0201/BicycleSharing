import {
  ERROR_MSG,
  GET_ORDER_LIST,
  GET_ORDER_LIST_MORE,
  INIT_ORDER
} from '../constants';

const init = {
  order_list: [],
  page:1,
  next:0
}

const state = {
  ...init
}

const getters = {

}

const actions = {
  getOrderList({ commit, state, dispatch }, { params, onSuccess, onFail }){
    axios.post('/bicycle/order', params).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        let data = res.data
        commit(GET_ORDER_LIST, data)
        onSuccess && onSuccess()
      } else {
        let msg = res.data.msg
        commit(ERROR_MSG, msg)
        onFail && onFail()
      }
    })
  },
  getOrderListMore({ commit, state, dispatch }, { params, onSuccess, onFail }) {
    axios.post('/bicycle/order', params).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        let data = res.data
        commit(GET_ORDER_LIST_MORE, data)
        onSuccess && onSuccess()
      } else {
        let msg = res.data.msg
        commit(ERROR_MSG, msg)
        onFail && onFail()
      }
    })
  }
}

const mutations = {
  [GET_ORDER_LIST](state, data){
    state.order_list = data.data
    state.next = data.next
    state.page = 2
  },
  [GET_ORDER_LIST_MORE](state, data) {
    state.order_list = [...state.order_list, ...data.data]
    state.next = data.next
    ++state.page
  },
  [INIT_ORDER](state) {
    Object.assign(state, init)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
