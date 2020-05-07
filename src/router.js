import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        // Pages
        {
          name: 'Guests',
          path: 'pages/guests',
          component: () => import('@/views/pages/GuestsPage'),
        },
      ],
    },
    {
      name: 'Login',
      path: '/login',
      component: () => import('@/views/login/Login'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Login' && localStorage.token) next({ name: 'Dashboard' })
  else if (to.name !== 'Login' && !localStorage.token) next({ name: 'Login' })
  else next()
})

export default router
