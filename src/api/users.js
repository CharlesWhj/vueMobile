import axios from '@/utils/myaxios'

export const userlogin = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
