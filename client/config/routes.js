import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  }, {
    path: '/app',
    component: Todo,
    name: 'app',
    props: (route) => ({id: route.query.a}),
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
    component: Login
  }, {
    path: '/login/exact',
    component: Login
  }
]
