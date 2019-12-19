<template>
  <div>
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
        <myinput
          placeholder="请输入手机号"
          type="text"
          :value="uers.username"
          @input="handleNumber"
          :rules="/^1\d{10}$/"
          err_msg="手机号输入不合法，请输入11位手机号"
        ></myinput>
        <br />
        <myinput
        placeholder="请输入用户名"
          type="text"
          v-model="uers.nickname"
          :rules='/\w{1,6}/'
          err_msg="用户名不符合要求"
        ></myinput>
        <br>
        <myinput placeholder="请输入密码" type="password" v-model="uers.password" :rules="/^\w+$/" err_msg="密码不符合要求"></myinput>
        <mybutton @click="handleRegister" text="注册" class="tgreen"></mybutton>
      </div>
      <p class="tips">
        有账号？
        <a href="#/login" class>去登录</a>
      </p>
    </div>
  </div>
</template>

<script>
import mybutton from '@/components/loginbtn.vue'
import myinput from '@/components/loginInput.vue'
// 引入注册api
import { userRegister } from '@/api/users'

export default {
  data () {
    return {
      uers: {
        username: '',
        password: '',
        nickname: ''
      }
    }
  },
  methods: {
    //   注册用户
    async handleRegister () {
      // console.log(this.uers)

      let res = await userRegister(this.uers)
      if (res.data.message === '注册成功') {
        this.$toast('恭喜你，注册成功')
        this.$router.push({ path: 'login' })
      } else {
        this.$toast.fail('注册失败,用户名被占用')
      }
    //   console.log(res)
    },
    handleNumber (data) {
      this.uers.username = data
    }
  },
  components: {
    mybutton,
    myinput
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
  height: 100vh;
  background-color: rgb(242, 242, 242);
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
.tgreen{
    background-color: green
}
</style>
