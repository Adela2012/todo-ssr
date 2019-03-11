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
  beforeRouteLeave (to, from, ) {
    console.log('login before route leave')
  },
  name: 'login',
  props: ['id'],
  mounted () {
    console.log('this.$route---',this.$route,'this.id---',this.id)
  }
}
</script>