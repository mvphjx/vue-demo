import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/simplestore'
import router from '@/router'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000
})

// request interceptor 拦截器
service.interceptors.request.use(
  config => {
    // do something before request is sent
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// http response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status !== 'ok') {
      Message.error({
        message: res.msg || 'Error'
      })
      // 401未登录,并且不是用户信息初始化接口，弹窗提示进行登录
      if (res.code === 401 && !response.config.url.endsWith('/common/info/user')) {
        MessageBox.confirm('登录信息已失效，请重新登录', '重新登陆', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.clear()
          router.push({ path: '/login' })
        }).catch(() => {
          store.clear()
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    // 超时请求
    // if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    //   console.log(error.message)
    // }
    console.log('err' + error) // for debug
    Message.error(error.message || 'Error', 5 * 1000)
    return Promise.reject(error)
  }
)

export default service
