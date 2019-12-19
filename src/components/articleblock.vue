<template>
  <div class="content" @click="toarticledetail">
    <div class="single">
      <div class="left">
        <p class="content">{{post.title}}</p>
        <p class="info" v-if="post.cover.length===1 && post.type===1">
          <span>{{post.user.nickname}}</span>
          <span>{{post.comment_length}}跟帖</span>
        </p>
      </div>
      <!-- 当一张图时 -->
      <img :src="post.cover[0].url" v-if="post.cover.length===1 && post.type===1" />
    </div>
    <!-- 当三张图时 -->
    <div class="imgaes" v-if="post.cover.length === 3">
      <img v-for="(value,index) in post.cover" :key="index" :src="value.url" />
    </div>
    <!-- 当为视频时 -->
    <div class="video" v-if="post.type === 2">
      <img :src="post.cover[0].url" />
       <div class="playbtn">
          <van-icon name="play" />
        </div>
    </div>
    <p v-if="post.cover.length===3 || post.type === 2 " class="info">
      <span>{{post.user.nickname}}</span>
      <span>{{post.comment_length}}跟帖</span>
    </p>
  </div>
</template>

<script>
export default {
  // post:当前需要渲染的新闻对象
  props: ['post'],
  methods: {
    toarticledetail () {
      this.$router.push({ path: `/articledetail/${this.post.id}` })
    }
  }
}
</script>

<style lang='less' scoped>
body {
  overflow-x: hidden;
  overflow-y: hidden;
}
.single {
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
    .content {
      font-size: 14px;
      padding: 0px 5px;
      line-height: 24px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  img {
    width: 120/360 * 100vw;
    height: 70/360 * 100vw;
    object-fit: cover;
    padding-right: 5px;
  }
}
.info {
    font-size: 12px;
    padding-left: 5px;
    color: #999;
    > span:nth-of-type(1) {
      padding-right: 15px;
    }
  }
/deep/.imgaes {
    display: flex;
    padding: 10px 0 10px 0;
    > img {
      padding: 0 5/360 * 100vw;
      box-sizing: border-box;
      display: block;
      width: 33.33%
    }
  }
  .video {
    width: 100%;
    height: 170/360 * 100vw;
    padding: 10px;
    box-sizing: border-box;
    position: relative;
    > img {
      width: 100%;
      height: 100%;
    }
    .playbtn {
      width: 50 * 100vw/360;
      height: 50 * 100vw/360;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      box-shadow: 0px 0px 10px #fff;
      text-align: center;
      color: #fff;
      font-size: 40px;
      .van-icon {
        line-height: 50 * 100vw/360;
      }
      }
  }
</style>
