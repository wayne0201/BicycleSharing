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
      <mt-button type="primary" size="large" @click="sumbit">登录</mt-button>
      <mt-button type="primary" size="large" plain @click="toRegister">注册</mt-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters} from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      userId: "",
      password: "",
      type: false
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
    ...mapGetters(["isEnterprise"])
  },
  methods: {
    ...mapActions(["doLogin"]),
    toRegister() {
      this.$router.push('/register');
    },
    validate() {
      let idRe = /^[a-zA-z]\w{3,15}$/
      let pwdRe = /\w{3,15}$/
      if(!idRe.test(this.userId)){
        MessageBox('请输入符合格式的账号', '4-16位字母、数字、下划线组成，字母开头');
        return;
      } else if (!pwdRe.test(this.password)){
        MessageBox('请输入符合格式的密码', '4-16位字母、数字、下划线组成');
        return;
      }
      return true
    },
    sumbit() {
      if(!this.validate()) return
      let params = {
        user_id: this.userId,
        type: Number(this.type),
        password: this.password,
      }
      this.doLogin({
        params,
        onSuccess: () => {
          if(this.isEnterprise){
            return this.$router.push("/list")
          } else {
            return this.$router.push("/bicycle")
          }
        },
        onFail: () => {
          Toast(this.user.msg)
        }
      })
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
