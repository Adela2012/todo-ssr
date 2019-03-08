import Vue from 'vue'

const childComponent = {
  name: 'childComponent',
  template: `<div>
    child ( {{value}} ), {{data.value}}
  </div>`,
  inject: ['yeye', 'value', 'data'],
  mounted() {
    console.log('childComponent',this.$parent.$options.name, this.yeye, this.value)
  }
}

const component = {
  name: 'comp',
  // template: `<div>
  //   <div :style="styles">
  //     <div class="header">
  //       <slot name="header"></slot>
  //     </div>
  //     <div class="body">
  //       <slot name="body"></slot>
  //     </div>
  //   </div>
  // </div>`,
  components: {childComponent},
  template: `<div>
  <childComponent/>
  <div :style="styles">
      <slot :value="1234"></slot>

  </div>
</div>`,
  props: [],
  data() {
    return {
      text: 1,
      styles: {
        border: '1px solid #aaa',
        width: '200px',
        height: '200px'
      }
    }
  },
  methods: {

  }
}

new Vue({
  el: '#app',
  // template: `
  //   <div>
  //     <comp-one>
  //       <span slot="header">this is a header</span>
  //       <span slot="body">this is a body</span>
  //     </comp-one>
  //   </div>
  // `,
  mounted() {
    console.log(this.$refs,'this.$refs')
  },
  provide() {
    const data = {}

    Object.defineProperty(data, 'value', {
      get: () => this.value,
      enumerable: true
    })

    return {
      yeye: 'yeye',
      value: this.value,
      data: data
    }
  },
  template: `
  <div>
    <input v-model="value"/>
    <comp-one ref="comp">
      <span slot-scope="props" ref="span">{{props.value}}</span>
    </comp-one>
  </div>
`,
  components: {
    'CompOne': component
  },
  data() {
    return {
      value: '123'
    }
  },
  methods: {
  }
})
