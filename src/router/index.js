import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/layout/Main'

import Index from '@/components/index.vue'
import Result from '@/components/result.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/',
          component: Index
        },
        {
          path: '/search',
          component: Result
        }
      ]
    }
  ]
})
