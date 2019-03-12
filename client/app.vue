<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <p>count：{{count}}， fullName：{{fullName}}</p>
    <!-- <p>textA: {{textA}}，textPlus：{{textPlus}}</p> -->
    <router-link to="/app">app</router-link>
    <router-link to="/login">login</router-link>
    <transition name="fade">
      <router-view/>
    </transition>
    <!-- <router-view name="foot"/> -->
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from './layout/Footer.jsx'
import Header from './layout/Header.vue'
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  components: {Footer, Header},
  data () {
    return {
      msg: 'hello'
    }
  },
  computed: {
    // textA () {
    //   return this.$store.state.a.text
    // },
    ...mapState({
      count: 'count',
      // textA: (state) => state.c.text
    }),
    // count() {
    //   return this.$store.state.count
    // },
    ...mapGetters({
      fullName: 'fullName',
      // textPlus: 'a/textPlus'
    })
    // fullName () {
    //   return this.$store.getters.fullName
    // }
  },
  methods: {
    ...mapActions({
      updateCountAsync:'updateCountAsync',
      // addA: 'a/add',
      // testAction: 'b/testAction'
    }),
    // ...mapMutations({
    //   updateTextA: 'a/updateText'
    // })
  },
  mounted() {
    this.updateCountAsync({num:2, time:1000})
    // this.updateTextA(111)
    // this.testAction()
    // this.$store.dispatch('updateCountAsync', {num:2,time:1000})
    // let i = 1
    // setInterval(() => {
    //   this.$store.commit('updateCount',i++)
    // }, 1000);
  }
}
</script>
