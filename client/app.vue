<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <div id="loading" v-show="loading">
      <loading />
    </div>
    <p>count：{{count}}， fullName：{{fullName}}</p>
    <!-- <p>textA: {{textA}}，textPlus：{{textPlus}}</p> -->
    <router-link to="/app">app</router-link>
    <router-link to="/login">login</router-link>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <!-- <router-view name="foot"/> -->
    <button @click="notify">click me</button>
    <!-- <notification content="test notify" /> -->
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from './layout/Footer.jsx'
import Header from './layout/Header.vue'
import Loading from './components/loading/loading.vue'
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  metaInfo: {
    title: 'Adela\'s todo list'
  },
  components: {Footer, Header, Loading},
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
      loading: 'loading'
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
    notify () {
      this.$notify({
        content: 'test $notify',
        btn: 'close'
      })
    }
  },
  mounted() {
    // this.updateCountAsync({num:2, time:1000})
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

<style lang="stylus">
#loading{
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  background-color rgba(255,255,255,.3)
  z-index 99
  display flex
  align-items center
  justify-content center
}
</style>

