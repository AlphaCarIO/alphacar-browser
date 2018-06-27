import axios from 'axios'
import store from '@/store'

const service = axios.create({
    baseURL: 'http://localhost:8800/v1',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        "Access-Control-Allow-Headers":"Authorization,Origin, X-Requested-With, Content-Type, Accept"
    },
    timeout: 15000
})

service.interceptors.response.use(
    function(response) {
      //请求正常则返回
      return Promise.resolve(response)
    },
    function(error) {
      // 请求错误则向store commit这个状态变化
      const httpError= { 
        hasError:true,
        status:error.response.status,
        statusText:error.response.statusText
      }
      //store.commit('ON_HTTP_ERROR', httpError)
      return Promise.reject(error)
    }
  )

export default service
