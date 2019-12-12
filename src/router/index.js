// 引入vue
import Vue from 'vue'
// 引进路由
import VueRouter from 'vue-router'
// 引入路由渲染组件
import Login from '@/views/login.vue'
// 将路由挂载到Vue中
Vue.use(VueRouter)
// 创建路由对象
const router = new VueRouter({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
})
export default router
