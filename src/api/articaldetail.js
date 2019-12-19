import axios from '@/utils/myaxios'
// 获取文章列表
export const articaldetail = (id) => {
  return axios({
    url: `/post/${id}`
  })
}

// 关注与取消关注
export const follow = (id) => {
  return axios({
    url: `/user_follows/${id}`
  })
}

export const unfollow = (id) => {
  return axios({
    url: `/user_unfollow/${id}`
  })
}
// 点赞与取消点赞
export const like = (id) => {
  return axios({
    url: `/post_like/${id}`
  })
}
// 文章收藏与取消收藏
export const collect = (id) => {
  return axios({
    url: `/post_star/${id}`
  })
}

// 获取跟帖
export const mycomment = (id) => {
  return axios({
    url: `/post_comment/${id}`
  })
}
