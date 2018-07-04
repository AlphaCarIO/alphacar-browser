import axios from 'axios'
//import store from '@/store'
import * as api_config from './api_config'

const service = axios.create(api_config.axios_conf)

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
