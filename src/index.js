import Vue from 'vue'

var root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  render: (h) => h(root)
})