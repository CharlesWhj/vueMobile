import axios from '@/utils/myaxios'
// 获取tap栏分类
export const tapcate = () => {
  return axios({
    method: 'get',
    url: '/category'
  })
}
