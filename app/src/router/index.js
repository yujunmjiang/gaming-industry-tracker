import Vue from 'vue'
import VueRouter from 'vue-router'
// import { component } from 'vue/types/umd'
import GetTopGames from '../views/GetTopGames.vue'
import GetTopStreamers from '../views/GetTopStreamers.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'GetTopGames',
    component: GetTopGames
  },
  {
    path: '/GetTopStreamers',
    name: 'GetTopStreamers',
    component: GetTopStreamers
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
