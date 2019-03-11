// import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  }, {
    path: '/app',
    components: {
      default: () => import('../views/todo/todo.vue'),
      foot: Login
    },
    beforeEnter (to, from, next) {
      // console.log('routes before enter invoked')
      next()
    },
    name: 'app',
    props: (route) => ({ id: route.query.a }),
    meta: {
      title: 'app-title',
      description: 'this is a app'
    },
    children: [{
      path: ':id',
      component: Login,
      props: true
    }]
  }, {
    path: '/login',
    components: {
      default: Login,
      foot: () => import('../views/todo/todo.vue')
    }
  }, {
    path: '/login/exact',
    component: Login
  }
]
