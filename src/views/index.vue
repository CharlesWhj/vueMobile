<template>
<div>
  <!-- 首页头部 -->
  <div class="header">
     <span class="iconfont iconnew"></span>
  <div class='center'><van-icon name="search" class="search"/>搜索商品</div>
  <van-icon name="user-circle-o" class="right" @click="topessonal"/>
  </div>
  <!-- 导航栏 -->
  <van-tabs v-model="addtabname" sticky animated swipeable>
  <van-tab v-for="(value,index) in catearr" :key="index" :title="value.name">
    <!-- 添加上拉加载更多 -->
    <van-list
    :immediate-check="false"
    :offset="10"
  v-model="value.loading"
  :finished="value.finished"
  finished-text="没有更多了"
  @load="onLoad">
  <!-- 添加下拉刷新页面 -->
  <van-pull-refresh v-model="value.isLoading" @refresh="onRefresh">
    <articleblock v-for="post in value.postList" :key="post.id" :post="post"></articleblock>
    </van-pull-refresh>
     </van-list>
  </van-tab>
  </van-tabs>
  </div>
</template>

<script>
// 引进api请求tap分类数据
import { tapcate } from '@/api/tapcate'
import { article } from '@/api/article'
// 引进文章内容组件
import articleblock from '@/components/articleblock.vue'
export default {
  data () {
    return {
      addtabname: localStorage.getItem('hotnews_token') ? 1 : 0,
      catearr: []
    }
  },
  methods: {
    // 跳转到个人中心页
    topessonal () {
      let userID = localStorage.getItem('userID')
      this.$router.push({ path: `/personal/${userID}` })
    },
    // 封装获取文章列表的方法
    async getarticledetailS () {
      let res = await article({
        pageIndex: this.catearr[this.addtabname].pageIndex,
        pageSize: this.catearr[this.addtabname].pageSize,
        category: this.catearr[this.addtabname].id
      })
      this.catearr[this.addtabname].postList.push(...res.data.data)
      // 数据加载完毕，方便再次下拉加载数据
      this.catearr[this.addtabname].loading = false
      // 刷新结束
      // this.catearr[this.addtabname].isLoading = false
      // 当没有数据时不再获取数据
      if (res.data.data.length < this.catearr[this.addtabname].pageSize) {
        this.catearr[this.addtabname].finished = true
      }
      // console.log(this.catearr[this.addtabname].postList)
    },
    // 上拉加载更多数据
    onLoad () {
      this.catearr[this.addtabname].pageIndex++
      // setInterval(() => {
      //   this.getarticledetailS()
      // }, 2000)
      this.getarticledetailS()
    },
    // 下拉刷新页面
    onRefresh () {
      // 清空页面
      this.catearr[this.addtabname].postList.length = 0
      // 加载一页
      this.catearr[this.addtabname].pageIndex = 1
      // 发送请求获取数据
      this.getarticledetailS()
      // 让刷新消失
      this.catearr[this.addtabname].isLoading = false
      // 让下拉获取数据继续生效，防止让刷新页面时一下子加载全部数据
      this.catearr[this.addtabname].loading = true
      // 让上拉加载数据消失
      this.catearr[this.addtabname].finished = false
    }
  },
  components: {
    articleblock
  },
  watch: {
    addtabname () {
      // console.log(this.addtabname)
      // 获取文章列表
      if (this.catearr[this.addtabname].postList.length === 0) {
        this.getarticledetailS()
      }
    }
  },
  async mounted () {
    // 获取tap文章分类名称
    let res = await tapcate()
    if (res.status === 200) {
      this.catearr = res.data.data
      // 给catearr里面添加成员（数组添加value）
      this.catearr = this.catearr.map(value => {
        return { ...value,
          postList: [],
          pageIndex: 1,
          pageSize: 4,
          // 添加上拉加载数据成员
          loading: false,
          finished: false,
          // 添加下拉列表刷新数据
          isLoading: false
        }
      })
      // 获取文章列表
      this.getarticledetailS()
    }
  }
}
</script>

<style lang="less" scoped>
.header{
  display: flex;
  height: 50*100vw/360;
  background-color: red;
  color: white;
  justify-content: space-between;
  align-items: center;
  padding: 0 10*100vw/360;
  .iconnew{
    font-size: 60*100vw/360
  }
  /deep/.right{
    font-size: 25*100vw/360
  }
  .center{
    flex: 1;
    padding: 5*100vw/360 15*100vw/360;
    margin-right:  10*100vw/360;
    text-align: center;
    font-size: 18*100vw/360;
    border-radius: 25*100vw/360;
    background-color: rgba(255, 255, 255, 0.4);
  }
}
</style>
