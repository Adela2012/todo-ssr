import Vue from 'vue'
import Component from './func-notification'

const NotificationConstructor = Vue.extend(Component)


let seed = 1
let instances = []
const notify = (options) => {
  if (Vue.prototype.$isServer) return

  const instance = new NotificationConstructor({})
  instance.id = `notification_${seed++}`
  instance.$mount()
  document.body.appendChild(instance.vm.$el)

  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instance.verticalOffset = verticalOffset

  instances.push(instance)
  return instance.vm
}

export default notify
