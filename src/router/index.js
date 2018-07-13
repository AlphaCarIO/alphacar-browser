import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/index.vue'
import SearchResult from '@/components/search_result.vue'
import UBIDetail from '@/components/ubi_detail.vue'
import Game from '@/components/Game.vue'

Vue.use(Router)

export default new Router({
  routes: [
        {
          path: '/',
          component: Index
        },
        {
          path: '/search',
          component: SearchResult
        },
        {
          path: '/ubi_detail/:ubi_code',
          component: UBIDetail
        },
        {
          path: '/game',
          component: Game
        }
  ]
})
