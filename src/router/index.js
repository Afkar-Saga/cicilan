import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CicilanView from '../views/CicilanView.vue'
import RiwayatView from '../views/RiwayatView.vue'
import TambahCicilanView from '../views/TambahCicilanView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/cicilan',
      name: 'cicilan',
      component: CicilanView
    },
    {
      path: '/riwayat',
      name: 'riwayat',
      component: RiwayatView
    },
    {
      path: '/tambah-cicilan',
      name: 'tambah-cicilan',
      component: TambahCicilanView
    }
  ]
})

export default router
