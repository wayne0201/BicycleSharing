<template>
  <div class="modify-info-page">
    <mt-header title="修改密码">
      <mt-button icon="back"  slot="left" @click="disChange">返回</mt-button>
    </mt-header>
    <div class="modify-info-box" v-if="isEnterprise">
      <mt-field label="公司名称" placeholder="更改公司名称" v-model.trim="enterpriseName" ></mt-field>
       <mt-field label="公司联系人" placeholder="更改公司联系人" v-model.trim="contacts" ></mt-field>
    </div>
    <div class="modify-info-box" v-else>
       <mt-field label="个人昵称" placeholder="更改个人昵称" v-model.trim="nickname" ></mt-field>
    </div>
    <div class="modify-info-btn">
      <mt-button type="primary" size="large" @click="changeInfoFn">确认修改</mt-button>
      <mt-button type="default" size="large" plain @click="disChange">放弃修改</mt-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters} from 'vuex'
export default {
  name: 'ModifyInfo',
  data () {
    return {
      enterpriseName: "",
      contacts: "",
      nickname: ""
    }
  },
  computed: {
    ...mapGetters(['isEnterprise']),
    ...mapState({
      user: state => state.user
    }),
    validate() {
      if(this.isEnterprise){
        if(!this.enterpriseName) {
          MessageBox('请输入公司名称', '公司名称不能为空')
          return
        } else if (!this.contacts) {
          MessageBox('请输入联系人', '公司联系人不能为空')
          return
        }
      } else {
        if(!this.nickname) {
          MessageBox('请输入个人昵称', '个人昵称不能为空')
          return
        }
      }
      return true
    }
  },
  methods: {
    ...mapActions(["changeInfo"]),
    changeInfoFn() {
      if(!this.validate) return
      let params = {
        enterpriseName: this.enterpriseName,
        contacts: this.contacts,
        nickname: this.nickname
      }
      this.changeInfo({
        params,
        onSuccess: () => {
          MessageBox.alert('资料修改成功!').then(action => {
            this.$router.go(-1)
          });
        },
        onFail: () => {
          Toast(this.user.msg)
        }
      })
    },
    disChange() {
      this.$router.go(-1)
    }
  },
  mounted() {
    this.enterpriseName = this.user.enterprise.enterprise_name
    this.contacts = this.user.enterprise.contacts
    this.nickname = this.user.personal.nickname
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modify-info-btn{
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
}
.modify-info-box{
  margin:60px 0px 34px;
}
.modify-info-btn .mint-button {
  margin: 20px 0;
}
</style>
