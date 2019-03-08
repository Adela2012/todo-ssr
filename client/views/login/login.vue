<template>
  <div>
    login
  </div>
</template>

<script>
export default {
  name: 'login',
  props: ['id'],
  mounted () {
    console.log('this.$route---',this.$route,'this.id---',this.id)
  }
}
</script>