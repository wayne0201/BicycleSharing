import axios from 'axios'
import { Indicator } from 'mint-ui';

// 拦截请求
axios.interceptors.request.use(function (config) {
  Indicator.open({
    text: '加载中...',
    spinnerType: 'snake'
  })
  return config
})

// 拦截相应
axios.interceptors.response.use(function (config) {
  Indicator.close()
  return config
})
