<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <p>count：{{count}}， fullName：{{fullName}}</p>
    <router-link :to="{name: 'app'}">app</router-link>
    <router-link to="/app/123">app-123</router-link>
    <router-link to="/app/456">app-456</router-link>
    <router-link to="/login">login</router-link>
    <router-link to="/login/exact">login-exact</router-link>
    <transition name="fade">
      <router-view/>
    </transition>
    <router-view name="foot"/>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from './layout/Footer.jsx'
import Header from './layout/Header.vue'
import {mapState, mapGetters} from 'vuex'
export default {
  components: {Footer, Header},
  data () {
    return {
      msg: 'hello'
    }
  },
  computed: {
    ...mapState(['count']),
    // count() {
    //   return this.$store.state.count
    // },
    ...mapGetters(['fullName'])
    // fullName () {
    //   return this.$store.getters.fullName
    // }
  },
  mounted() {
    this.$store.commit('updateCount',1)
  }
}
</script>
