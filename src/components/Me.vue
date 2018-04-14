<template>
  <div class="me-page">
    <mt-header>
      <span slot="left" class="header-left">个人信息</span>
    </mt-header>
    <div class="profile">
      <img src="../assets/header-img.png" width="64" height="64">
      <div class="profile-box">
        <div class="name">{{formatData.name}}</div>
        <div class="userid">{{formatData.userid}}</div>
      </div>
    </div>
    <div class="me-item" v-if="isEnterprise">
      <mt-cell title="联系人" :value="formatData.contacts">
        <img slot="icon" src="../assets/contacts-icon.png" width="24" height="24">
      </mt-cell>
    </div>
    <div class="me-item" v-else>
      <mt-cell title="使用状态" :value="formatData.status?'正在使用':'未使用单车'">
        <img slot="icon" src="../assets/cycle-icon.png" width="24" height="24">
      </mt-cell>
    </div>
    <div class="me-item">
      <mt-cell title="修改资料" to="/modifyInfo" is-link></mt-cell>
      <mt-cell title="修改密码" to="/modifyPwd" is-link replace></mt-cell>
    </div>
    <div class="me-btn">
      <mt-button type="danger" size="large" @click="logout">退出登录</mt-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations} from 'vuex'
import browserCookies from "browser-cookies"
export default {
  name: 'Me',
  data () {
    return {
      popupVisible: false
    }
  },
  computed: {
    ...mapGetters(['isEnterprise']),
    ...mapState({
      user: state => state.user
    }),
    formatData(){
      if(this.isEnterprise){
        return {
          name:this.user.enterprise.enterprise_name,
          userid: this.user.user_id,
          contacts: this.user.enterprise.contacts
        }
      } else {
        return{
          name: this.user.personal.nickname,
          userid: this.user.user_id,
          status: this.user.personal.lease_status
        }
      }
    }
  },
  methods: {
    ...mapMutations(['logoutSumbit']),
    logout() {
      MessageBox.confirm('确认退出登录吗?', '注销').then(action => {
        browserCookies.erase('u_id')
        browserCookies.erase('u_type')
        this.logoutSumbit()
        this.$router.push("/login")
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.profile{
  background: #26a2ff;
  color: #fff;
  box-sizing: border-box;
  padding: 25px 20px 35px;
  display: flex;
  align-items: center;
}
.profile-box{
  margin-left: 8px;
  flex: 1;
}
.me-page .name{
  font-size: 30px;
  line-height: 1.5;
  font-weight:700;
}
.me-page .userid{
  margin-top: 3px;
}
.me-item{
  margin: 20px 0;
}
.me-btn{
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
}
.header-left{
  font-weight: 700;
  font-size: 18px;
}
</style>
