import {
  ERROR_MSG,
  GET_LIST,
  GET_LIST_MORE,
  GET_FAULT_LIST,
  GET_FAULT_LIST_MORE,
  INIT_LIST
} from '../constants';

const init = {
  bicycle_list: {
    list: [],
    page: 1,
    next: 0
  },
  fault_list: {
    list: [],
    page: 1,
    next: 0
  }

}

const state = {
  ...init
}

const getters = {

}

const actions = {
  getList({ commit, state, dispatch }, { params, onSuccess, onFail }) {
    axios.post('/bicycle/list', params).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        let data = res.data
        commit(GET_LIST, data)
        onSuccess && onSuccess(data)
      } else {
        let msg = res.data.msg
        commit(ERROR_MSG, msg)
        onFail && onFail(msg)
      }
    })
  },
  getListMore({ commit, state, dispatch }, { params, onSuccess, onFail }) {
    axios.post('/bicycle/list', params).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        let data = res.data
        commit(GET_LIST_MORE, data)
        onSuccess && onSuccess(data)
      } else {
        let msg = res.data.msg
        commit(ERROR_MSG, msg)
        onFail && onFail(msg)
      }
    })
  },
  getFaultList({ commit, state, dispatch }, { params, onSuccess, onFail }) {
    axios.post('/bicycle/faultList', params).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        let data = res.data
        commit(GET_FAULT_LIST, data)
        onSuccess && onSuccess(data)
      } else {
        let msg = res.data.msg
        commit(ERROR_MSG, msg)
        onFail && onFail(msg)
      }
    })
  },
  getFaultListMore({ commit, state, dispatch }, { params, onSuccess, onFail }) {
    axios.post('/bicycle/faultList', params).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        let data = res.data
        commit(GET_FAULT_LIST_MORE, data)
        onSuccess && onSuccess(data)
      } else {
        let msg = res.data.msg
        commit(ERROR_MSG, msg)
        onFail && onFail(msg)
      }
    })
  },
  createBicycle({ commit, state, dispatch }, { params, onSuccess, onFail }) {
    axios.post('/bicycle/createBicycle', params).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        let data = res.data
        commit(GET_LIST, data)
        onSuccess && onSuccess(data)
      } else {
        let msg = res.data.msg
        commit(ERROR_MSG, msg)
        onFail && onFail(msg)
      }
    })
  },
  removeBicycle({ commit, state, dispatch }, { params, onSuccess, onFail }) {
    axios.post('/bicycle/removeBicycle', params).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        let data = res.data
        commit(GET_LIST, data)
        onSuccess && onSuccess(data)
      } else {
        let msg = res.data.msg
        commit(ERROR_MSG, msg)
        onFail && onFail(msg)
      }
    })
  },
}

const mutations = {
  [GET_LIST](state, data) {
    state.bicycle_list.list = data.data
    state.bicycle_list.next = data.next
    state.bicycle_list.page = 2
  },
  [GET_LIST_MORE](state, data) {
    state.bicycle_list.list = [...state.bicycle_list.list, ...data.data]
    state.bicycle_list.next = data.next
    ++state.bicycle_list.page
  },
  [GET_FAULT_LIST](state, data) {
    state.fault_list.list = data.data
    state.fault_list.next = data.next
    state.fault_list.page = 2
  },
  [GET_FAULT_LIST_MORE](state, data) {
    state.fault_list.list = [...state.fault_list.list, ...data.data]
    state.fault_list.next = data.next
    ++state.fault_list.page
  },
  [INIT_LIST](state) {
    Object.assign(state, init)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
