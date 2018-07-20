import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index.vue'
import SearchResult from '@/components/SearchResult.vue'
import UBIDetail from '@/components/UbiDetail.vue'
import TokenInfo from '@/components/TokenInfo.vue'
import AboutUs from '@/components/AboutUs.vue'
import Game from '@/components/Game.vue'
import Game2 from '@/components/Game2.vue'

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
          path: '/token',
          component: TokenInfo
        },
        {
          path: '/about_us',
          component: AboutUs
        },
        {
          path: '/game',
          component: Game
        },
        {
          path: '/game2',
          component: Game2
        }
  ]
})
