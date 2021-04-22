import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/getproduction',
    name: 'GetProduction',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "getproduction" */ '../views/GetProduction.vue')
  },
  {
    path: '/getrevenue',
    name: 'GetRevenue',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "getrevenue" */ '../views/GetRevenue.vue')
  },
  {
    path: '/getcommunity',
    name: 'GetCommunity',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "getcommunity" */ '../views/GetCommunity.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
