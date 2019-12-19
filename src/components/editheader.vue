<template>
<div class="header">
    <span><slot name="left"></slot></span>
    <span class="center">{{title}}</span>
     <span class="Right"><slot name='right'></slot></span>
</div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang="less" scoped>
.header{
    display: flex;
    justify-content: space-between;
    height: 40*100vh/360;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 0 10*100vh/360;
    >.Right{
         color: #aaa;
        font-size: 13px;
     }
    .center{
        font-weight: 700
    }
}
</style>
