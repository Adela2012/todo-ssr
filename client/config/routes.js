// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/login'
  },

  {
    path: '/app',
    component: () => import('../views/todo/todo.vue'),
    // component: Todo,
    name: 'app',
    props: (route) => ({ id: route.query.a }),
    meta: {
      title: 'app-title',
      description: 'this is a app'
    },
    beforeEnter (to, from, next) {
      // console.log('routes before enter invoked')
      next()
    }
  },

  {
    path: '/login',
    component: () => import('../views/login/login.vue')
    // component: Login
  }
  // {
  //   path: '/exact',
  //   components: {
  //     default: () => import('../views/todo/todo.vue'),
  //     foot:  () => import('../views/login/login.vue')
  //   },
  // }
]
