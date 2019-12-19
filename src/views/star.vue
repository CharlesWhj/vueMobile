<template>
<div class="collect">
    <myheader title="我的收藏">
    <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    <span  name="right"></span>
</myheader>
<starcell  v-for="(value,index) in starlist" :key="index" :post="value"></starcell>
</div>
</template>

<script>
// 引入组件
import myheader from '../components/editheader'
import starcell from '../components/starblock'
// 引入api方法
import { mystar } from '../api/myfollow'
export default {
  data () {
    return {
      starlist: []
    }
  },
  components: {
    myheader,
    starcell
  },
  async mounted () {
    let res = await mystar()
    this.starlist = res.data.data
    // console.log(this.starlist)
  }
}
</script>

<style>

</style>
