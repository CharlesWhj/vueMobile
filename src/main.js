import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router/index'
// 引入初始化式样
import '@/styles/reset.css'
// 引入Vant插件
import Vant from 'vant'
// import { Toast } from 'vant'
// Vue.use(Toast)
import 'vant/lib/index.css'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  // 让所有应有都可以应用路由
  router,
  render: h => h(App)
}).$mount('#app')
