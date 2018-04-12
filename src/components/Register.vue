<template>
  <div class="register-page">
    <mt-header title="用户注册">
      <router-link to="/login" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="register-field">
      <mt-field label="账号" placeholder="请输入账号" v-model="userId"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      <mt-cell title="是否注册企业用户">
        <mt-switch v-model="type"></mt-switch>
      </mt-cell>
    </div>

    <div class="per-register" v-if="!type">
      <mt-field label="昵称" placeholder="请输入昵称" v-model="nickname"></mt-field>
    </div>
    <div class="ent-register" v-else>
      <mt-field label="公司名称" placeholder="请输入公司名称" v-model="enterpriseName"></mt-field>
      <mt-field label="联系人" placeholder="请输入公司联系人" v-model="contacts"></mt-field>
    </div>
    <div class="register-btn">
      <mt-button type="primary" size="large">提交</mt-button>
    </div>
  </div>
</template>

<script>
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
