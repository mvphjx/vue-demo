// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/**
 * 创建vue实例
 *   导入app组件
 */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
