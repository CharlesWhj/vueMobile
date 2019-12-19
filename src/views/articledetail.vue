<template>
  <div class="articaldetail">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()"/>
        <span class="iconfont iconnew new"></span>
      </div>
      <!-- 关注与取消关注 -->
      <span @click="care" :class="{active:detailList.has_follow}">{{detailList.has_follow? "已关注":"关注"}}</span>
    </div>
    <div class="detail">
      <div class="title">{{detailList.title}}</div>
      <div class="desc">
        <span>{{detailList.user && detailList.user.nickname}}</span> &nbsp;&nbsp;
        <span>2019-9-9</span>
      </div>
      <div class="content" v-html="detailList.content" v-if="detailList.type===1">
      </div>
       <video :src="detailList.content" v-if="detailList.type===2" controls poster="http://localhost:3000/uploads/image/IMG1576418549217.jpeg"></video>
      <div class="opt">
        <!-- 点赞与取消点赞 -->
        <span class="like" @click="Ilike" :class="{active:this.detailList.has_like}">
          <van-icon name="good-job-o"/>点赞{{detailList.like_length}}
        </span>
        <span class="chat">
          <van-icon name="chat" class="w" />微信
        </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item" v-for="(value,index) in commentlist" :key="index">
        <div class="head">
          <img :src="value.user.head_img" alt />
          <div>
            <p>{{value.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">{{value.content}}</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
    <!-- 评论区 -->
    <comments class="comment" :post="detailList"></comments>
  </div>
</template>

<script>
// 引进articaldetail方法请求数据
import { articaldetail, follow, unfollow, like, mycomment } from '@/api/articaldetail'
// 引入评论区组件
import comments from '@/components/comments.vue'
export default {
  data () {
    return {
      detailList: {},
      commentlist: []
    }
  },
  components: {
    comments
  },
  methods: {
    // 关注与取消关注
    async care () {
      if (this.detailList.has_follow === false) {
        let res = await follow(this.detailList.user.id)
        // console.log(res)
        this.$toast.success(res.data.message)
        this.detailList.has_follow = true
      } else {
        let res = await unfollow(this.detailList.user.id)
        console.log(res)
        this.$toast.success('取消关注成功')
        this.detailList.has_follow = false
      }
    },
    // 点赞与取消点赞
    async Ilike () {
      // let res = await like(this.detailList.id)
      // if (res.data.message === '点赞成功') {
      //   this.$toast(res.data.message)
      //   this.detailList.like_length++
      //   this.detailList.has_like = true
      // } else {
      //   this.$toast(res.data.message)
      //   this.detailList.like_length--
      //   this.detailList.has_like = false
      // }
      // console.log(res)
      // 简写
      let res = await like(this.detailList.id)
      this.detailList.has_like = !this.detailList.has_like
      if (res.data.message === '点赞成功') {
        this.detailList.like_length++
      } else {
        this.detailList.like_length--
      }
      this.$toast(res.data.message)
    }
  },
  async  mounted () {
    // 根据id获取文章的详情，实现文章详情的动态渲染
    let res = await articaldetail(this.$route.params.id)
    // console.log(res)
    if (res.status === 200) {
      this.detailList = res.data.data
      console.log(this.detailList)
    }
    // 获取评论列表
    let res1 = await mycomment(this.$route.params.id)
    if (res1.status === 200) {
      this.commentlist = res1.data.data
      // console.log(this.commentlist)
      this.commentlist.map(item => {
        item.user.head_img = localStorage.getItem('hotnews_url') + item.user.head_img
      })
    }
  }
}
</script>

<style lang='less' scoped>
.articaldetail{
  position: relative
}
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    // background-color: #f00;
    color: black;
    text-align: center;
    border-radius: 15px;
    border:1px #ccc solid;
    font-size: 13px;
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
    margin-bottom: 50px;
  }
}
/deep/.photo{
    text-indent: 0;
    a>img{
    width: 100%;
}
}
video{
    width: 100%
}
.active{
    background-color: #f00;
    color:white!important
}
// /deep/.comment{
//   // position: absolute;
//   // width: 100%
// }
</style>
