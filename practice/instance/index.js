import Vue from 'vue'

const app = new Vue({
  // el: '#app',
  template: '<div ref="div">{{text}}<span>{{obj.a}}</span></div>',
  data: {
    text: 0,
    obj: {}
  }
})

app.$mount('#app')

// let i = 0
setInterval(() => {
  // i++
  // app.text += 1
  // app.obj.a = i
  // app.$forceUpdate()
  // app.$set(app.obj, 'a', i)
  // app.$data.text += 2
}, 1000);

console.log('app.$data', app.$data)
console.log('app.$props', app.$props)
console.log('app.$el', app.$el)
console.log('app.$options', app.$options)
console.log('app.$root', app.$root)
console.log('app.$children', app.$children)
console.log('app.$slots', app.$slots)
console.log('app.$scopedSlots', app.$scopedSlots)
console.log('app.$refs', app.$refs)
console.log('app.$isServer', app.$isServer)
console.log('app', app, app == app.$root)

// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// }

// var unWatch = app.$watch('text', (newVal, oldVal) => {
//   console.log(newVal,oldVal,'=========')
// })

// setTimeout(() => {
//   unWatch()
// }, 2000);


// app.$on('test', (a, b)=>{
//   console.log(a,b,'========---')
// })

// app.$once('test', (a, b)=>{
//   console.log(a,b,'========---')
// })

// setInterval(() => {
//   app.$emit('test',1,2)
// }, 1000);

// app.$forceUpdate()
