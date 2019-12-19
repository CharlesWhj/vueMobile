<template>
  <div class="myfollow">
<myheader title="我的关注">
    <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    <span  name="right"></span>
</myheader>
<div class="profile" v-for="(value,index) in followlist" :key="index">
        <img :src="value.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>
          {{value.nickname}}
          </div>
          <div class="time">2019-12-24</div>
        </div>
        <!-- <span class="active">取消关注</span> -->
        <button class="active" @click="getfocususer(value.id,index)">取消关注</button>
      </div>
  </div>
</template>

<script>
// 引入相对应组件
import myheader from '@/components/editheader'
// 引进api方法
import { followusers } from '@/api/myfollow'
import { unfollow } from '../api/articaldetail'
export default {
  data () {
    return {
      followlist: []
    }
  },
  components: {
    myheader
  },
  async mounted () {
    let res = await followusers()
    if (res.status === 200) {
      this.followlist = res.data.data
      this.followlist.map(item => {
        item.head_img = localStorage.getItem('hotnews_url') + item.head_img
      })
    }
    console.log(this.followlist)
    // console.log(this.followlist[0].head_img)
  },
  methods: {
    //   取消关注
    async getfocususer (id, index) {
      let res = await unfollow(id)
      if (res.status === 200) {
        this.followlist.splice(index, 1)
      }
      console.log(res)
    }
  }

}
</script>

<style lang="less" scoped>
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
  // .exit{
  //   display: flex;
  //   justify-content: center;
  // }
  // /deep/.exitBtn{
  //   margin: 0 auto!important;
  // }
}
/deep/.exitBtn {
  margin: 50px auto !important;
  background-color: red
}
.active{
    background-color: #ccc;
    border-radius: 10px
}

</style>
