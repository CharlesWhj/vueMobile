import axios from '@/utils/myaxios'
export const updatepersonal = (data) => {
  return axios({
    method: 'post',
    url: '/upload',
    data
  })
}
