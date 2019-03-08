import Vue from 'vue'

const component = {
  name: 'comp',
  // template: `
  //   <div :style="style">
  //     <slot></slot>{{propOne}}
  //   </div>
  // `,
  render (createElement) {
    return createElement(
      'div',
      {
        style: this.style,
        on: {
          click: () => this.$emit('click')
        }
      },
      [
        this.$slots.header,
        this.propOne
      ]
    )
  },
  props: ['propOne'],
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
  mounted() {
    console.log(this.$refs,'this.$refs')
  },
  // template: `
  //   <comp-one ref="comp">
  //     <span ref="span">{{value}}</span>
  //   </comp-one>
  // `,
  components: {
    'CompOne': component
  },
  render (createElement) {
    return  createElement(
      'comp-one',
      {
        ref: 'comp',
        props: {
          propOne: 'propOne'
        },
        on: {
          click: this.handleClick
        },
        // nativeOn: {
        //   click: this.handleClick
        // }
      },
      [
        createElement(
          'span',
          {
            ref: 'span',
            slot: 'header',
            attrs: {
              id: 'test-id'
            }
          },
          this.value
        )
      ]
    )
  },
  data() {
    return {
      value: 'value'
    }
  },
  methods: {
    handleClick () {
      console.log('click')
    }
  }
})
