import createApp from './create-app'

const {router, app } = createApp()

router.onReady(() => {
  app.$mount('#app')
})
