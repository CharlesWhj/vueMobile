import axios from '@/utils/myaxios'

// 用户登录发送请求
export const userlogin = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
// 进入个人中心页，发送请求
export const Personal = (id) => {
  return axios({
    method: 'get',
    url: `/user/${id}`
    // 在拦截器里面实现token值的判断
    // headers: ({ Authorization: localStorage.getItem('hotnews_token') })
  })
}

// 编辑用户信息
export const edit = (id, data) => {
  return axios({
    method: 'post',
    url: `/user_update/${id}`,
    data
  })
}

// 用户注册
export const userRegister = (data) => {
  return axios({
    method: 'post',
    url: '/register',
    data
  })
}
