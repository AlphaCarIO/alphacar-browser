import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index.vue'
import SearchResult from '@/components/SearchResult.vue'
import UBIDetail from '@/components/UbiDetail.vue'
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
