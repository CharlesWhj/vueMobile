<template>
<div class="personal">
  <router-link :to="'/editpersonal/'+this.currentusers.id">
      <div class="profile">
        <img :src="currentusers.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>
           {{currentusers.nickname}}
          </div>
          <div class="time">2019-12-24</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
      </router-link>
      <cell title="我的关注" desc='关注的用户' @click="jump"></cell>
      <cell title="我的眼贴" desc='眼贴/回复'></cell>
      <cell title="我的收藏" desc='文章/视频' @click="$router.push({ name: 'mystar' })"></cell>
      <cell title="设置" desc=''></cell>
      <mybutton text="退出" class="exitBtn" @click="exit"></mybutton>
  </div>
</template>

<script>
import { Personal } from '@/api/users'
// 引入子组件
import cell from '@/components/personcell.vue'
import mybutton from '../components/loginbtn.vue'
export default {
  data () {
    return {
      // nickname: ''
      currentusers: {
      }
    }
  },
  components: {
    cell, mybutton
  },
  methods: {
    exit () {
      this.$router.push({ name: 'index' })
      localStorage.removeItem('hotnews_token')
    },
    jump () {
      this.$router.push({ name: 'myfollow' })
    }
    // tostar () {
    //   this.$router.push({ name: 'mystar' })
    // }
  },
  mounted () {
    // console.log(this.$route.params.id)
    Personal(this.$route.params.id)
      .then(res => {
        // console.log(res)
        if (res.data.message === '获取成功') {
          this.currentusers = res.data.data
          // console.log(res.data.data)
          // 设置默认图片
          if (this.currentusers.head_img) {
            this.currentusers.head_img = localStorage.getItem('hotnews_url') + res.data.data.head_img
          } else {
            this.currentusers.head_img = localStorage.getItem('hotnews_url') + '/uploads/image/IMG1576418549217.jpeg'
          }
        }
      })
      .catch(err => {
        console.log(err)
        this.$toast.fail('获取信息失败')
      })
  }
}
</script>

<style lang="less" scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
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
</style>
