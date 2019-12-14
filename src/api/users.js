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
    url: `/user/${id}`,
    headers: ({ Authorization: localStorage.getItem('hotnews_token') })
  })
}
