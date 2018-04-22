import {
  AUTH_SUCCESS,
  ERROR_MSG,
  CHANG_LEASE_STATUS,
  INIT_USER,
  INIT_ORDER,
  INIT_BICYCLE
} from '../constants';

const init = {
  type: 0,
  user_id: "",
  enterprise: {
    enterprise_name: "",
    contacts: ""
  },
  personal: {
    lease_status: false,
    nickname: "",
  },
  msg: ""
}

const state = {
  ...init
}

const getters = {
  isEnterprise(state) {
    return state.type
  }
}

const actions = {
  doRegister({ commit, state, dispatch }, { params, onSuccess, onFail }) {
    axios.post('/user/register', params).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        let data = res.data.data
        commit(AUTH_SUCCESS, data)
        onSuccess && onSuccess(data)
      } else {
        let msg = res.data.msg
        commit(ERROR_MSG, msg)
        onFail && onFail(msg)
      }
    })
  },
  doLogin({ commit, state, dispatch }, { params, onSuccess, onFail }) {
    axios.post('/user/login', params).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        let data = res.data.data
        commit(AUTH_SUCCESS, data)
        onSuccess && onSuccess(data)
      } else {
        let msg = res.data.msg
        commit(ERROR_MSG, msg)
        onFail && onFail(msg)
      }
    })
  },
  getInfo({ commit, state, dispatch }, { params, onSuccess, onFail }) {
    axios.post('/user/info', params).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        let data = res.data.data
        commit(AUTH_SUCCESS, data)
        onSuccess && onSuccess(data)
      } else {
        let msg = res.data.msg
        commit(ERROR_MSG, msg)
        onFail && onFail(msg)
      }
    })
  },
  changeInfo({ commit, state, dispatch }, { params, onSuccess, onFail }) {
    axios.post('/user/changeInfo', params).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        let data = res.data.data
        commit(AUTH_SUCCESS, data)
        onSuccess && onSuccess(data)
      } else {
        let msg = res.data.msg
        commit(ERROR_MSG, msg)
        onFail && onFail(msg)
      }
    })
  },
  logoutSumbit({ commit, state, dispatch }){
    commit(INIT_USER);
    commit(INIT_ORDER);
    commit(INIT_BICYCLE);
  }
}

const mutations = {
  [AUTH_SUCCESS](state, data) {
    Object.assign(state, data, { msg:""})
  },
  [ERROR_MSG](state ,msg){
    Object.assign(state, { msg })
  },
  [CHANG_LEASE_STATUS](state, flag){
    state.personal.lease_status = flag
  },
  [INIT_USER](state) {
    Object.assign(state, init)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
