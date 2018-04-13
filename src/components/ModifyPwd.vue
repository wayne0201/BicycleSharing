<template>
  <div class="modify-pwd-page">
    <mt-header title="修改密码">
      <router-link to="/me" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="modify-pwd-box">
      <mt-field label="旧密码" placeholder="请输入旧密码" v-model="oldPassword" type="password"></mt-field>
      <mt-field label="新密码" placeholder="请输入新密码" v-model="password" type="password"></mt-field>
    </div>
    <div class="modify-pwd-btn">
      <mt-button type="primary" size="large" @click="changePwd">确认修改</mt-button>
      <mt-button type="default" size="large" plain @click="disChange">放弃修改</mt-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations} from 'vuex'
import browserCookies from "browser-cookies"
export default {
  name: 'ModifyPwd',
  data () {
    return {
      oldPassword: "",
      password: ""
    }
  },
  computed: {
  },
  methods: {
    ...mapMutations(['logoutSumbit']),
    disChange() {
      this.$router.push("/me")
    },
    validate() {
      let pwdRe = /\w{4,15}$/
      if(!pwdRe.test(this.oldPassword)){
        MessageBox('旧密码格式错误', '请输入4-16位字母、数字、下划线组成')
        return
      } else if (!pwdRe.test(this.password)){
        MessageBox('新密码格式错误', '请输入4-16位字母、数字、下划线组成')
        return
      }
      return true
    },
    changePwd() {
      if(!this.validate()) return
      let { oldPassword, password } = this
      axios.post('/user/changePwd', {
        oldPassword,
        password
      }).then(res => {
        if (res.status === 200 && res.data.code === 0) {
          let msg = res.data.msg
          this.isChange(msg)
        } else {
          let msg = res.data.msg
          Toast(msg)
        }
      })
    },
    isChange(msg){
      MessageBox.alert('密码修改成功，请重新登录！').then(action => {
        browserCookies.erase('u_id')
        browserCookies.erase('u_type')
        this.logoutSumbit()
        this.$router.push("/login")
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modify-pwd-btn{
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
}
.modify-pwd-box{
  margin:60px 0px 34px;
}
.modify-pwd-btn .mint-button {
  margin: 20px 0;
}
</style>
