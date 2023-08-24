import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      name: 'rustcraft',
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
    }
  ]
})

export default router
