import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router/index'
Vue.config.productionTip = false

new Vue({
  // 让所有应有都可以应用路由
  router,
  render: h => h(App)
}).$mount('#app')
