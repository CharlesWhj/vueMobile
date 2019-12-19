import axios from '@/utils/myaxios'
// 关注用户与取消关注用户
export const followusers = () => {
  return axios({
    url: '/user_follows'
  })
}
// 收藏文章与取消收藏
export const mystar = () => {
  return axios({
    url: '/user_star'
  })
}
