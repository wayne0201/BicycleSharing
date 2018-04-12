<template>
  <div class="register-page">
    <mt-header title="用户注册">
      <router-link to="/login" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="register-field">
      <mt-field label="账号" placeholder="请输入账号" v-model.trim="userId" ></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model.trim="password"></mt-field>
      <mt-cell title="是否注册企业用户">
        <mt-switch v-model="type"></mt-switch>
      </mt-cell>
    </div>

    <div class="per-register" v-if="!type">
      <mt-field label="昵称" placeholder="请输入昵称" v-model.trim="nickname"></mt-field>
    </div>
    <div class="ent-register" v-else>
      <mt-field label="公司名称" placeholder="请输入公司名称" v-model.trim="enterpriseName"></mt-field>
      <mt-field label="联系人" placeholder="请输入公司联系人" v-model.trim="contacts"></mt-field>
    </div>
    <div class="register-btn">
      <mt-button type="primary" size="large" @click="submit">提交</mt-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Register',
  data () {
    return {
      userId: "",
      password: "",
      nickname: "",
      enterpriseName: "",
      contacts: "",
      type: false
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    ...mapActions(["doRegister"]),
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
      if(this.type){
        if(!this.enterpriseName) {
          MessageBox('请输入公司名称', '公司名称不能为空');
          return;
        } else if (!this.contacts) {
          MessageBox('请输入公司联系', '公司联系人不能为空');
          return;
        }
      } else {
        if(!this.nickname) {
          MessageBox('请输入个人昵称', '个人昵称不能为空');
          return;
        }
      }
      return true;
    },
    submit() {
      if(!this.validate()) return;
      let params = null;
      if(this.type) {
        params = {
          enterprise_id: this.userId,
          enterprise_name: this.enterpriseName,
          password: this.password,
          contacts: this.contacts,
          type: Number(this.type)
        }
      } else {
        params = {
          personal_id: this.userId,
          password: this.password,
          nickname: this.nickname,
          type: Number(this.type)
        }
      }
      this.doRegister({
        params,
        onSuccess: () => {
          this.$router.push("/")
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
.per-register, .ent-register, .register-btn{
  margin: 20px 0;
}
.register-btn{
  width: 100%;
  box-sizing: border-box;
  padding: 0 30px;
}
</style>
