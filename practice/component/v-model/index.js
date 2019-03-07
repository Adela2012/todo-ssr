import Vue from 'vue'

const component = {
  template: `<div>
    <input :value="value1" @input="handleInput"/>
  </div>`,
  model: {
    prop: 'value1',
    event: 'change'
  },
  props: ['value1'],
  data() {
    return {
      text: 1
    }
  },
  methods: {
    handleInput(e) {
      console.log('e.target.value', e.target.value)
      this.$emit('change', e.target.value)
    }
  }
}

// Vue.component('CompOne',component)

new Vue({
  el: '#app',
  template: `
    <div>
      <comp-one v-model="value"/>
    </div>
  `,
  // <comp-one :value="value" @input="value = arguments[0]"/>
  components: {
    'CompOne': component
  },
  data() {
    return {
      value: 1
    }
  },
  methods: {
  }
})
