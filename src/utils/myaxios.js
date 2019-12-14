// 封装基准路径
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
// 添加请求拦截器
// config:相当于当前的请求报文
axios.interceptors.request.use(function (config) {
//   console.log(config)
  let token = localStorage.getItem('hotnews_token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
// 所有响应都必须经过
axios.interceptors.response.use(function (response) {
  if (response.data.message === '用户信息验证失败!' || response.data.message === '用户信息验证失败') {
    this.$toast.fail('获取个人信息失败')
    window.location.href = '#/login'
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default axios
