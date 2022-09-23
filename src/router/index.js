import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  }
]

const router = new VueRouter({
  routes
})

export default router