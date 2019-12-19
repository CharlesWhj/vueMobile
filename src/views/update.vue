<template>
  <div class="edit">
<editHeader title="编辑个人资料">
    <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
    <span slot="right" @click="$router.back()">退出</span>
</editHeader>
<div class="head">
      <img :src="usermsg.head_img"/>
      <van-uploader :after-read="afterRead" />
    </div>
    <!-- 昵称栏 -->
<personcell title="昵称" :desc="usermsg.nickname" @click="nickshow=!nickshow"></personcell>
<van-dialog id="van-dialog" title="修改昵称" show-cancel-button
  @confirm="editUsernick" v-model="nickshow">
<van-field
    required
    label="用户名"
    icon="question-o"
    placeholder="请输入用户名"
    :value="usermsg.nickname"
    ref='nickname'
  />
</van-dialog>
<!-- 密码栏 -->
<personcell title="密码" :desc="usermsg.password" @click="pswshow=!pswshow" type="password"></personcell>
<van-dialog id="van-dialog" title="修改密码" show-cancel-button
  @confirm="editUserpsw" v-model="pswshow" :before-close="beforeClose">
<van-field
    required
    label="原密码"
    icon="question-o"
    placeholder="请输入原密码"
    ref='oldpsw'
  />
  <van-field
    required
    label="新密码"
    icon="question-o"
    placeholder="请输入新密码"
    ref='newpsw'
  />
</van-dialog>
<!-- 性别栏 -->
<personcell title="性别" :desc="usermsg.gender === 1 ?'女':'男'" @click="gendershow=!gendershow"></personcell>
<van-dialog id="van-dialog" title="修改性别" show-cancel-button
  @confirm="editUsergender" @cancel='Cancel' v-model="gendershow"  >
<van-picker
  :columns="['男','女']"
  @change="onchange"
  :default-index="+usermsg.gender"
/>
</van-dialog>
  </div>
</template>

<script>
// 引入子组件
import editHeader from '@/components/editheader.vue'
import personcell from '@/components/personcell.vue'
// 引入api请求方法
import { Personal, edit } from '@/api/users'
// import { edit } from '../api/users'
// 文件上传
import { updatepersonal } from '@/api/updatepersonal'
// 引入动画
// import Toast from 'path/to/@vant/weapp/dist/toast/toast'
export default {
  data () {
    return {
      usermsg: {},
      nickshow: false,
      pswshow: false,
      gendershow: false,
      genderIndex: ''
    }
  },
  components: {
    editHeader, personcell
  },
  async mounted () {
    let id = this.$route.params.id
    let res = await Personal(id)
    // console.log(this.$route.params.id)
    // console.log(res)
    if (res.data.message === '获取成功') {
      this.usermsg = res.data.data
      // console.log(this.usermsg)
      if (this.usermsg.head_img) {
        this.usermsg.head_img = localStorage.getItem('hotnews_url') + this.usermsg.head_img
      } else {
        this.usermsg.head_img = localStorage.getItem('hotnews_url') + '/uploads/image/IMG1576418549217.jpeg'
      }
    } else {
      this.$toast.fail('获取用户信息失败')
    }
  },
  methods: {
    // 编辑图片
    async afterRead (file) {
      // console.log(file)
      let formdata = new FormData()
      formdata.append('file', file.file)
      let res = await updatepersonal(formdata)
      // console.log(res)
      if (res.data.message === '文件上传成功') {
        let res1 = await edit(this.$route.params.id, { head_img: res.data.data.url })
        // console.log(res1)
        if (res1.data.message === '修改成功') {
          this.$toast.success('修改用户头像成功')
          // 刷新页面
          this.usermsg.head_img = localStorage.getItem('hotnews_url') + res.data.data.url
        } else {
          this.$toast.fail('图片上传失败')
        }
      } else {
        this.$toast.fail('文件上传失败，请重试')
      }
    },
    // 编辑昵称
    async editUsernick () {
      // console.log(this.$refs.nickname.$refs.input.value)
      let res2 = await edit(this.$route.params.id, { nickname: this.$refs.nickname.$refs.input.value })
      // console.log(res2)
      if (res2.data.message === '修改成功') {
        this.$toast.success('修改用户昵称成功')
        // 刷新页面
        this.usermsg.nickname = res2.data.data.nickname
      } else {
        this.$toast.fail('修改用户昵称失败')
      }
    },
    // 修改密码
    async  editUserpsw () {
      // alert(123)
      let oldpsw = this.$refs.oldpsw.$refs.input.value
      let newpsw = this.$refs.newpsw.$refs.input.value
      if (/\w{3,11}/.test(newpsw) === false) {
        return
      }
      // console.log(oldpsw)
      // 判断用户输入的旧密码是否正确
      if (oldpsw === this.usermsg.password) {
        // console.log(newpsw)
        let res1 = await edit(this.$route.params.id, { password: newpsw })
        // console.log(res2)
        if (res1.data.message === '修改成功') {
          this.$toast.success('修改密码成功')
          // 刷新页面
          // this.usermsg.password = res1.data.data.password
          // 修改密码成功跳到登陆页
          this.$router.push({ path: '/login' })
          localStorage.removeItem('hotnews_token')
        } else {
          this.$toast.fail('修改密码失败')
        }
      } else { this.$toast.fail('输入的旧密码不正确，请重新输入') }
    },
    // 原密码不正确，保留输入框
    beforeClose (action, done) {
      let oldpassword = this.$refs.oldpsw.$refs.input.value
      let newpassword = this.$refs.newpsw.$refs.input.value
      if (action === 'confirm' && this.usermsg.password !== oldpassword) {
        this.$toast.fail('原密码不正确')
        done(false)
      } else if (action === 'confirm' && /\w{3,11}/.test(newpassword) === false && this.usermsg.password === oldpassword) {
        this.$toast.fail('请输入3-16位的新密码')
        done(false)
      } else {
        done()
      }
    },
    // 修改性别
    async editUsergender () {
      // console.log(this.genderIndex)
      let res = await edit(this.$route.params.id, { gender: this.genderIndex })
      // console.log(res)
      if (res.data.message === '修改成功') {
        this.$toast.success('修改性别成功')
        // 刷新页面
        this.usermsg.gender = this.genderIndex
        // console.log(this.usermsg.gender)
      } else {
        this.$toast.fail('修改性别失败')
      }
    },
    onchange (picker, value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`)
      this.genderIndex = index
    },
    Cancel () {
      this.$toast('取消')
    }
  }
}
</script>

<style lang="less" scoped>
.head{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10*100vw/360 0;
    position: relative;
    /deep/.van-uploader__wrapper{
    display: block;
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    border-radius: 50%;
    }
}
img {
    display: block;
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    border-radius: 50%;
  }
/deep/.van-uploader{
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%,-50%);
    // background-color: transparent;
    opacity: 0
}
</style>
