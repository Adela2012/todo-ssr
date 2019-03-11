import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import './assets/styles/global.styl'
import createRouter from './config/router'

Vue.use(VueRouter)
const router = createRouter()

router.beforeEach((to, from, next) => {
  // console.log('index before enter each invoked')
  next()
  // if (to.fullPath !== '/login') {
  //   console.log('to path is not login')
  //   next({path: '/login'})
  // } else next()
})

router.beforeResolve((to, from, next) => {
  // console.log('index before enter resolve invoked')
  next()
})

router.afterEach((to, from) => {
  // console.log('index before after each invoked')
})

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
