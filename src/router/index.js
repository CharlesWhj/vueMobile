// 引入vue
import Vue from 'vue'
// 引进路由
import VueRouter from 'vue-router'
// 引入路由渲染组件
import Login from '@/views/login.vue'
import Personal from '@/views/personal.vue'
// 将路由挂载到Vue中
Vue.use(VueRouter)
// 创建路由对象
const router = new VueRouter({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'personal',
      path: '/personal/:id',
      component: Personal
    }
  ]
})
// 设置导航守卫
router.beforeEach((to, from, next) => {
  // console.log(123)
  // console.log(token)
  if (to.path.indexOf('/personal/') === 0) {
    let token = localStorage.getItem('hotnews_token')
    if (token) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    next()
  }
})
export default router
