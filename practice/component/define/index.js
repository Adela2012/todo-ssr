import Vue from 'vue'

const component = {
  template: `<div>
    {{text}}-{{propOne}}
    <div v-if="active">active</div>
    <div v-else>unActive</div>
    <button @click="onClick">click me</button>
  </div>`,
  props: {
    active: {
      validator (value) {
        console.log(typeof value === 'boolean')
        return typeof value === 'boolean'
      }
    },
    propOne: [String, Number]
  },
  data() {
    return {
      text: 1
    }
  },
  methods: {
    onClick() {
      this.$emit('click')
    }
  }
}

// Vue.component('CompOne',component)

new Vue({
  el: '#app',
  template: `
    <div>
      <comp-one :active="true" :prop-one="value" @click="handle"/>
      <comp-one :active="false"  :prop-one="value"/>
    </div>
  `,
  components: {
    'CompOne': component
  },
  data() {
    return {
      value: 1
    }
  },
  methods: {
    handle() {
      console.log('emit')
    }
  }
})
