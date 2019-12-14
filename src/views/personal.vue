<template>
<div>个人中心页</div>
</template>

<script>
import { Personal } from '@/api/users'
export default {
  mounted () {
    // console.log(this.$route.params.id)
    Personal(this.$route.params.id)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style>

</style>
