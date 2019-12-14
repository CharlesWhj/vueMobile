<template>
<div class="btn" @click="handlelogin">
{{text}}
</div>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    handlelogin () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.btn{
   width:314*100vw/360;
   height: 40*100vw/360;
   background-color:  #d81e06;
   font-size: 18*100vw/360;
   text-align: center;
   line-height: 40*100vw/360;
   border-radius: 20*100vw/360;
   color: #fff
}
</style>
