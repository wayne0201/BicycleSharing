<template>
  <div class="login-page">
    <div class="logo">
      <img src="../assets/logo.png" alt="logo">
    </div>
    <div class="login-field">
      <mt-field label="账号" placeholder="请输入账号" v-model.trim="userId"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model.trim="password"></mt-field>
      <mt-cell title="是否企业登录">
        <mt-switch v-model="type"></mt-switch>
      </mt-cell>
    </div>
    <div class="login-btn">
      <mt-button type="primary" size="large">登录</mt-button>
      <mt-button type="primary" size="large" plain @click="toRegister">注册</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      userId: "",
      password: "",
      type: false
    }
  },
  methods: {
    toRegister() {
      this.$router.push('/register');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-page{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  background: #fff;
}
.logo{
  text-align: center;
  box-sizing: border-box;
  margin: 60px auto 20px;
  width: 200px;
  height: 200px;
  background: #26a2ff;
  border-radius: 100%;
}
.logo img{
  width: 100%;
}
.login-field{
  margin: 0 30px;
}
.login-btn{
  width: 100%;
  box-sizing: border-box;
  padding: 0 30px;
}
.login-btn .mint-button {
  margin: 20px 0;
}

</style>
