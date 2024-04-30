import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ErrorView from '../views/ErrorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/rustcraft',
      name: 'Rustcraft',
      component: HomeView
    },
    {
      path: '/flixr',
      name: 'Flixr',
      component: HomeView
    },
    {
      path: '/mobingo',
      name: 'Mobingo',
      component: HomeView
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: ErrorView
    }
  ]
})

export default router
