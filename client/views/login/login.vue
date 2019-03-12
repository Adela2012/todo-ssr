<template>
  <div>
    login
  </div>
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    console.log('login before route enter')
    next()
  },
  beforeRouteUpdate (to, from, next) {
    console.log('login before route update')
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('login before route leave')
    next()
  },
  metaInfo: {
    title: 'login'
  },
  name: 'login',
  props: ['id'],
  mounted () {
    console.log('this.$route---',this.$route,'this.id---',this.id)
  }
}
</script>
