import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'

import createStore from './store/store'
import createRouter from './config/router'
import Notification from './components/notification'
import Tabs from './components/tabs'
import App from './app.vue'
import './assets/styles/global.styl'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Meta)
Vue.use(Notification)
Vue.use(Tabs)

export default () => {
  const store = createStore()
  const router = createRouter()

  const app = new Vue({
    store,
    router,
    render: h => h(App)
  })

  return { store, router, app }
}
