import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index.vue'
import SearchResult from '@/components/SearchResult.vue'
import UBIDetail from '@/components/UbiDetail.vue'
import TokenInfo from '@/components/TokenInfo.vue'
import AboutUs from '@/components/AboutUs.vue'
import CarSnap from '@/components/games/CarSnap.vue'
import SphereTracer from '@/components/games/SphereTracer.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
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
          path: '/car_snap',
          component: CarSnap
        },
        {
          path: '/demo',
          component: SphereTracer
        },
        {path: '*', redirect: '/'}
  ]
})
