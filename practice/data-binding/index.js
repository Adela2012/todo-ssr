import Vue from 'vue'

new Vue({
  el: '#app',
  data: {
    isActive: true,
    html: '<span>124</span>',
    style: {
      color: 'blue'
    }
  },
  template: `
    <div @click="onClick"
      :class="{active: isActive}"
      :style="style"
      >
      {{isActive ? 'ok':'fail'}}
      <p v-html="html"></p>
    </div>
  `,
  methods: {
    onClick() {
      console.log('kkk')
    }
  }
})
