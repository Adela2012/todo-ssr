<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
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
