<template>
  <div class="detail-page">
    <mt-header title="单车详情">
      <mt-button slot="left" icon="back" @click="goBack">返回</mt-button>
    </mt-header>
    <div class="detail-body">
      <mt-cell title="单车编号">
        <img slot="icon" src="../assets/id-icon.png" width="24" height="24">
        <span class="bicycle-id">{{detail.bicycle_id}}</span>
      </mt-cell>
      <mt-cell title="开锁密码">
        <img slot="icon" src="../assets/pwd-icon.png" width="24" height="24">
        <span class="bicycle-pwd">{{detail.bicycle_pwd}}</span>
      </mt-cell>
      <mt-cell title="被使用次数">
        <img slot="icon" src="../assets/count-icon.png" width="24" height="24">
        <span class="bicycle-count">{{detail.count}}次</span>
      </mt-cell>
      <mt-cell title="所有者ID">
        <img slot="icon" src="../assets/boss-icon.png" width="24" height="24">
        <span class="enterprise-id">{{detail.enterprise_id}}</span>
      </mt-cell>
      <mt-cell title="最近使用者ID" v-if="detail.personal_id">
        <img slot="icon" src="../assets/user-icon.png" width="24" height="24">
        <span class="personal_id">{{detail.personal_id}}</span>
      </mt-cell>
      <mt-cell title="单车状态">
        <img slot="icon" src="../assets/status-icon.png" width="24" height="24">
        <span class="bicycle-status" :class="cssList[detail.bicycle_status]">{{bicycleStatus[detail.bicycle_status]}}</span>
      </mt-cell>
      <mt-cell title="故障原因" v-if="detail.bicycle_status == 2">
        <img slot="icon" src="../assets/fault-icon-2.png" width="24" height="24">
        <span class="fault" >{{detail.warning_content}}</span>
      </mt-cell>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters} from 'vuex'
export default {
  name: 'Detail',
  data() {
    return {
      detail: {},
      bicycleStatus:['闲置', '正被使用', '发生故障'],
      cssList: ['no-use', 'use', 'fault'],
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  activated() {
    let bicycle_id = this.$route.params.id
    axios.post('/bicycle/detail', {bicycle_id}).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        this.detail = res.data.data
      } else {
        let msg = res.data.msg
        Toast(msg)
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.detail-body span{
  font-weight: 700;
  font-size: 18px;
}
.bicycle-id, .bicycle-pwd{
  font-size: 18px;
  color: #333;
}
.bicycle-count{
  color: #26a2ff;
}
.no-use{
  color:#4caf50;
}
.use{
  color: #ffc107;
}
.fault{
  color: #f44336;
}
</style>
