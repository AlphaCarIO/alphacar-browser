import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/index.vue'
import Result from '@/components/result.vue'

Vue.use(Router)

export default new Router({
  routes: [
        {
          path: '/',
          component: Index
        },
        {
          path: '/search',
          component: Result
        }
  ]
})
