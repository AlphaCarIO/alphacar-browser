import axios from 'axios'
import * as api_config from './api_config'

const service = axios.create(api_config.axios_conf)

service.interceptors.response.use(
    function(response) {
      return Promise.resolve(response)
    },
    function(error) {
      return Promise.reject(error)
    }
)

export default service
