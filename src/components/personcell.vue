<template>
  <div class="cell" @click="handleEdit">
      <div class="left">
          {{title}}
      </div>
      <div class="right" >
          {{type==="password"? "******":desc}}<span class="iconfont iconjiantou1"></span>
      </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'desc', 'type'],
  methods: {
    handleEdit () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.cell{
    display: flex;
    justify-content: space-between;
    height: 60*100vw/360;
    align-items: center;
    padding: 0 10*100vw/360;
     border-bottom: 1px solid #ccc;
     >.right{
         color: #aaa;
        font-size: 13px;
     }
}
</style>
