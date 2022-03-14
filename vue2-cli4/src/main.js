import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import '@/permission' // 权限控制
Vue.config.productionTip = false
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)
import MyComponents from 'my-components/components/lib'
import 'my-components/components/css/index.scss'
import 'font-awesome/scss/font-awesome.scss'
Vue.use(MyComponents)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// 全局异常处理
Vue.config.errorHandler = function(error, vm) {
  console.warn('VUE 抛出全局异常', error)
  vm.$notify({
    title: '警告',
    message: error,
    type: 'warning'
  })
}
/**
 * 开启模拟数据，使用参数指定需要模拟的接口
 * 但是要先在mock/module进行声明
 * 如果不需要注释掉下面的代码。
 */
import initMock from './mock'
initMock('*/user', '*dologin', '*')
