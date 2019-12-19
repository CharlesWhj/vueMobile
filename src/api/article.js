import axios from '@/utils/myaxios'
// 获取文章列表
export const article = (params) => {
  return axios({
    method: 'get',
    url: '/post',
    params
  })
}
