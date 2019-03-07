import Vue from 'vue'

var app = new Vue({
  // template: `<div>{{text}}</div>`,
  data: {
    text: 1
  },
  beforeCreate() {
    console.log(this.$el,'beforeCreate')
  },
  created() {
    console.log(this.$el,'created')
  },

  beforeMount() {
    console.log(this.$el,'beforeMount')
  },
  mounted() {
    console.log(this.$el,'mounted')
  },

  beforeUpdate() {
    console.log(this,'beforeUpdate')
  },
  updated() {
    console.log(this,'updated')
  },

  activated() {
    console.log(this,'activated')
  },
  deactivated() {
    console.log(this,'deactivated')
  },

  beforeDestroy() {
    console.log(this,'beforeDestroy')
  },
  destroyed() {
    console.log(this,'destroyed')
  },

  render (h) {
    throw new TypeError('render error')
    // console.log('render function invoked')
    // return h('div', {}, this.text)
  },
  renderError(h, err) {
    return h('div', {}, err.stack)
  },
  errorCaptured: (err, vm, info) => {
    // 会向上冒泡，且正式环境可以用
  },
})

app.$mount('#app')

// setInterval(() => {
//   app.text += 1
// }, 1000);

// setTimeout(() => {
//   app.$destroy()
// }, 1000);
