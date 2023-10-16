import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CicilanView from '../views/CicilanView.vue'
import RiwayatView from '../views/RiwayatView.vue'
import TambahCicilanView from '../views/TambahCicilanView.vue'
import DetailCicilanView from '../views/DetailCicilanView.vue'
import LoginView from '../views/LoginView.vue'
import UnauthorizedView from '../views/UnauthorizedView.vue'
import supabase from '../lib/supabaseClient'

let localUser

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
      name: 'tambahCicilan',
      component: TambahCicilanView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: UnauthorizedView
    },
    {
      path: '/cicilan/:id',
      name: 'detailCicilan',
      component: DetailCicilanView,
      props: true,
      meta: { requiresAuth: true }
    }
  ]
})

async function getUser(next) {
  localUser = await supabase.auth.getSession()
  if (localUser.data.session == null) {
    console.log(localUser.data.session)
    next('/unauthorized')
  } else next()
}

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    getUser(next)
  } 
  else next()
})

export default router
