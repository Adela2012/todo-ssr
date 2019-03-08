import Router from 'vue-router'
import routes from './routes'

export default () => {
  return new Router({
    routes,
    mode: 'history',
    // base: '/base',
    linkActiveClass: 'link-active',
    linkExactActiveClass: 'link-exact-active',
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
    // fallback: true, // true：hash的模式，false：每次从后台返回新的
    // parseQuery (query) {
    //   console.log('query',query)
    //   return {
    //     a: 'aaa'
    //   }
    // },
    // stringifyQuery (obj) {
    //   console.log('obj',obj)
    //   return '?a=aaa'
    // }
  })
}
