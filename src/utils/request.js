import axios from 'axios'
import * as app_config from '@/config/app_config'

const service = axios.create(app_config.axios_conf)

service.interceptors.response.use(
    function(response) {
      return Promise.resolve(response)
    },
    function(error) {
      return Promise.reject(error)
    }
)

export default service
