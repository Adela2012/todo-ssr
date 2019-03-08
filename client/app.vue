<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <router-link to="/app">app</router-link>
    <router-link to="/login">login</router-link>
    <router-link to="/login/exact">exact</router-link>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from './layout/Footer.jsx'
import Header from './layout/Header.vue'

export default {
  components: {Footer, Header},
  data () {
    return {
      msg: 'hello'
    }
  }
}
</script>
