import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import MyUi from "my-components/components/lib";
import 'my-components/components/css/index.scss';
console.log("将组件库的组件，注册到VUE实例中：Vue.use(MyUi)")
Vue.use(MyUi);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
