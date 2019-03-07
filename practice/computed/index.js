import Vue from 'vue'

new Vue ({
  el: '#app',
  data: {
    firstName: 'Adela',
    lastName: 'Yang',
    number: '',
    obj:{}
  },
  template: `
    <div>
      number:<input v-model="number"/><br>
      firstName: <input v-model="firstName"/><br>
      lastName: <input v-model="lastName"/><br>
      fullName:<input v-model="name"/><br>
      obj.a:<input v-model="obj.a"/><br>
      obj.b:<input v-model="obj.b"/><br>
      <div>{{name}}</div>
      <div>{{getName()}}</div>
    </div>
  `,
  watch:{
    firstName () {
      console.log('watch firstName')
    },
    obj: {
      handler () {
        console.log('watch obj')
      },
      immediate: true, // 初始化的时候是否立刻出发
      deep: true // 对象
    },
    'obj.b': {
      handler () {
        console.log('watch obj.b')
      }
    }
  },
  computed: {
    // name () {
    //   console.log('new name ')
    //   return `${this.firstName} ${this.lastName}`
    // }
    name: {
      get () {
        // console.log('new name ')
        return `${this.firstName} ${this.lastName}`
      },
      set (names) {
        let arr = names.split(' ')
        this.firstName = arr[0] || ''
        this.lastName = arr[1] || ''
      }
    }
  },
  methods: {
    getName () {
      // console.log('getname invoked')
      return `${this.firstName} ${this.lastName}`
    }
  }
})
