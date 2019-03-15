<template>
  <section class="real-app">
    <div class="tabs-container">
      <tabs :value="tabValue" @change="tabChangeHandle">
        <tab label="tab1" index="1"> 111</tab>
        <tab index="2"><span style="color: red;" slot="label">tab2</span>222</tab>
        <tab label="tab3"  index="3"> 222</tab>
      </tabs>
    </div>
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下去要做什么？"
      @keyup.enter="addTodo"
    >
    <item
      v-if="filteredTodos.length>0"
      :todo="todo"
      v-for="todo in filteredTodos"
      :key="todo.id"
      @del="deleteTodo"
    />
    <helper
      v-if="todos.length>0"
      :filter="filter"
      :todos="todos"
      @toggle="toggleFilter"
      @clearAllCompleted="clearAllCompleted"
    />
  </section>
</template>

<script>
import Item from './item.vue'
import Helper from './tabs.vue'
let id = 0
export default {
  // mounted () {
  //   console.log('this.id', this.id)
  // },
  // props: ['id'],
  data () {
    return {
      todos: [],
      filter: 'all',
      tabValue: '1'
    }
  },
  metaInfo: {
    title: 'todo'
  },
  components: {
    Item,
    Helper
  },
  computed: {
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = ''
    },
    deleteTodo (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    toggleFilter (state) {
      this.filter = state
    },
    clearAllCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    },
    tabChangeHandle (value) {
      this.tabValue = value
    }
  }
}
</script>

<style lang="stylus" scoped>
.real-app{
  width 600px
  margin 0 auto
  box-shadow 0 0 5px #666
}
.add-input{
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}
.tabs-container
  background #ffffff
  padding 0 15px
</style>
