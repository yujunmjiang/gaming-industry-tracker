import Vue from 'vue'
import VueRouter from 'vue-router'
// import { component } from 'vue/types/umd'
import GetHomepage from '../views/GetHomepage.vue'
import GetProduction from '../views/GetProduction.vue'
import GetTopGames from '../views/GetTopGames.vue'
// import GetTopStreamers from '../views/GetTopStreamers.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'GetHomepage',
    component: GetHomepage
  },
  {
    path: '/GetProduction',
    name: 'GetProduction',
    component: GetProduction
  },
  {
    path: '/GetTopGames',
    name: 'GetTopGames',
    component: GetTopGames
  },
  // {
  //   path: '/GetTopStreamers',
  //   name: 'GetTopStreamers',
  //   component: GetTopStreamers
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
