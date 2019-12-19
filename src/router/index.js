// 引入vue
import Vue from 'vue'
// 引进路由
import VueRouter from 'vue-router'
// 引入路由渲染组件
import Login from '@/views/login.vue'
import Personal from '@/views/personal.vue'
import editPersonal from '@/views/update.vue'
import Index from '@/views/index.vue'
import Register from '@/views/register.vue'
import Articledetail from '@/views/articledetail.vue'
import Myfollow from '@/views/care.vue'
import Mystar from '@/views/star.vue'
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
    },
    {
      name: 'editpersonal',
      path: '/editpersonal/:id',
      component: editPersonal
    },
    {
      name: 'index',
      path: '/index',
      component: Index
    },
    {
      name: 'defalut',
      path: '/',
      component: Index
    },
    {
      name: 'register',
      path: '/register',
      component: Register
    },
    {
      name: 'articledetail',
      path: '/articledetail/:id',
      component: Articledetail
    },
    {
      name: 'myfollow',
      path: '/myfollow',
      component: Myfollow
    },
    {
      name: 'mystar',
      path: '/mystar',
      component: Mystar
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
