<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <Todo></Todo>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from './layout/Footer.jsx'
import Header from './layout/Header.vue'
import Todo from './views/todo/todo.vue'

export default {
  components: {Footer, Header, Todo},
  data () {
    return {
      msg: 'hello'
    }
  }
}
</script>
