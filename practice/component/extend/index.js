import Vue from 'vue'

const component = {
  template: `<div>
    {{text}}-{{propOne}}
    <div v-if="active">active</div>
    <div v-else>unActive</div>
    <button @click="onClick">click me</button>
  </div>`,
  props: {
    active: Boolean,
    propOne: [String, Number]
  },
  data() {
    return {
      text: 1
    }
  },
  mounted() {
    console.log('component mounted')
  },
  methods: {
    onClick() {
      this.$emit('click')
    }
  }
}

// Vue.component('CompOne',component)
// const CompVue = Vue.extend(component)

// new CompVue({
//   el: '#app',
//   propsData: {
//     propOne: '11'
//   },
//   data: {
//     text: 12
//   },
//   mounted() {
//     console.log('instance mounted')
//   },
// })

const parent = new Vue({
  name: 'parent'
})

const component2 = {
  parent: parent,
  extends: component,
  mounted() {
    this.$parent.text = 1111
    console.log('component2 mounted',this.$parent.$options.name)
  },
  data() {
    return {text: 'comp2'}
  }
}

new Vue({
  parent: parent,
  name: 'Root',
  el: '#app',
  mounted() {
    this.$parent.text = 1111
    console.log('vue mounted',this.$parent.$options.name)
  },
  components: {
    Comp: component2
  },
  data: {
    text: '123'
  },
  template: `<div>{{text}}<Comp /></div>`
})

