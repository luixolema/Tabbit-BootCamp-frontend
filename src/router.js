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
  const logged = sessionStorage.token

  if (to.name !== 'Login' && !logged) {
    return next({ name: 'Login' })
  }

  if (to.name === 'Login' && logged) {
    return next({ name: 'Dashboard' })
  }

  next()
})

export default router
