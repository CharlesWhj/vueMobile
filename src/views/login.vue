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
        <myinput placeholder="请输入密码" type="password" :value="uers.password"
        v-model="uers.password"></myinput>
        <mybutton @click="handleLogin" text="登录"></mybutton>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class>去注册</a>
      </p>
    </div>
  </div>
</template>

<script>
import mybutton from '@/components/loginbtn.vue'
import myinput from '@/components/loginInput.vue'
import { userlogin } from '@/api/users'
// import Vue from 'vue'
// import vueResource from 'vue-resource'
// Vue.use(vueResource)
export default {
  data () {
    return {
      uers: {
        username: '12345678',
        password: '12345'
      }
    }
  },
  methods: {
    handleLogin () {
      console.log(this.uers)
      userlogin(this.uers)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      // Vue.http.post(
      //   'http://localhost:3000/login',
      //   this.uers, {
      //   //   'headers': {
      //   //     'Content-Type': 'x-www-form-urlencoded'
      //   //   }
      //   }
      // ).then(function (res) {
      //   console.log(res)
      // })
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
</style>
