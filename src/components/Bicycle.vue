<template>
  <div class="bicycle-page">
    <mt-header>
      <span slot="left" class="header-left">共享单车</span>
    </mt-header>
    <div class="logo" v-if="!user.personal.lease_status">
      <img src="../assets/logo.png" alt="logo">
    </div>
    <div class="bicycle-rent" v-if="!user.personal.lease_status">
      <div class="bicycle-field">
        <mt-field placeholder="请输入六位单车编号" @keypress.native="keyFn($event)" v-model.trim="bicycle_id"></mt-field>
      </div>
      <div class="bicycle-field-btn">
        <mt-button type="primary" size="large" @click="sumbit">租车</mt-button>
      </div>
    </div>
    <div class="bicycle-order" v-else>
      <div class="bicycle-id-title">
        单车编号
      </div>
      <div class="bicycle-id">
        {{bicycle.bicycle_id}}
      </div>
      <div class="bicycle-pwd-title">
        开锁密码
      </div>
      <div class="bicycle-pwd">
        {{bicycle.bicycle_pwd}}
      </div>
      <div class="bicycle-time-title">
        起始时间
      </div>
      <div class="bicycle-time">
        {{createTime[1]}}
      </div>
      <div class="bicycle-day">
        {{createTime[0]}}
      </div>

      <div class="bicycle-order-btn">
        <mt-button type="danger" size="large" @click="warningFn">单车报障</mt-button>
        <mt-button type="default" size="large" @click="returnBicycleFn">归还单车</mt-button>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapState, mapGetters} from 'vuex'
export default {
  name: 'Bicycle',
  data () {
    return {
      bicycle_id: ""
    }
  },
  components: {

  },
  computed: {
    ...mapState({
      user: state => state.user,
      bicycle: state => state.bicycle
    }),
    validate() {
      const reg = /^\d{6}$/
      if(!reg.test(this.bicycle_id)){
        MessageBox("格式错误","请输入六位单车编号")
        return
      }
      return true
    },
    createTime(){
      let time = new Date(this.bicycle.create_time)
      return [time.getFullYear() + "/"+ (time.getMonth() + 1) + "/"+ time.getDate() + "/", time.getHours() + "点" + time.getMinutes() + "分"]
    }
  },
  methods: {
    ...mapActions(["rentBicycle", "getOrder", "returnBicycle", "warning"]),
    keyFn(e){
      if(e.keyCode === 13) {
        this.sumbit()
      }
    },
    sumbit(){
      if(!this.validate) return
      let params = {
        user_id: this.user.user_id,
        bicycle_id: this.bicycle_id
      }
      this.rentBicycle({
        params,
        onSuccess: () => {
        },
        onFail: () => {
          Toast(this.user.msg)
        }
      })
    },
    returnBicycleFn(){
      MessageBox.confirm('确定归还单车?').then(action => {
        let params ={
          bicycle_id: this.bicycle.bicycle_id,
          order_id: this.bicycle.order_id,
          personal_id: this.user.user_id
        }
        this.returnBicycle({
          params,
          onSuccess: (endTime) => {
            let time = new Date(endTime)
            MessageBox("骑行结束", time.getFullYear() + "/"+ (time.getMonth() + 1) + "/"+ time.getDate() + "/ "+time.getHours() + "点" + time.getMinutes() + "分")
          },
          onFail:() => {
            Toast(this.user.msg)
          }
        })
      }, () => {})
    },
    warningFn() {
      MessageBox.prompt('单车在使用过程中有哪些故障？', '单车报障').then(({ value, action }) => {
        let params ={
          bicycle_id: this.bicycle.bicycle_id,
          order_id: this.bicycle.order_id,
          personal_id: this.user.user_id,
          warning_content: value
        }
        this.warning({
          params,
          onSuccess: (endTime) => {
            let time = new Date(endTime)
            MessageBox("报障成功，骑行结束", time.getFullYear() + "/"+ (time.getMonth() + 1) + "/"+ time.getDate() + "/ "+time.getHours() + "点" + time.getMinutes() + "分")
          },
          onFail:() => {
            Toast(this.user.msg)
          }
        })
      }, () => {})
    }
  },
  mounted() {
    if(this.user.personal.lease_status){
      this.getOrder({
        params: {
          user_id: this.user.user_id,
        },
        onFail:() => {
          Toast(this.user.msg)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bicycle-page{
  background: #80c0f1;
}
.mint-header{
  background: #80c0f1;
}
.logo{
  text-align: center;
  box-sizing: border-box;
  margin: 20px auto;
  width: 200px;
  height: 200px;
  border-radius: 100%;
  border: 4px solid #fff;
  background: #26a2ff;

}
.logo img{
  width: 100%;
}
.bicycle-rent{
  padding: 40px 60px;
}
.bicycle-order{
  display: flex;
  align-items: center;
  flex-direction: column;
}
.bicycle-order>div{
  margin-top: 26px;
}
.bicycle-id{
  font-size: 20px;
  font-weight: 700;
  color: #fff;
}
.bicycle-pwd{
  font-size: 46px;
  font-weight: 700;
  color: #ffc107;
}
.bicycle-time{
  font-size: 20px;
  font-weight: 700;
  color: #fff;
}
.bicycle-day{
  font-weight: 700;
  color: #fff;
}
.bicycle-order .bicycle-order-btn{
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
}
.bicycle-field-btn{
  margin-top: 30px;
}
.header-left{
  font-weight: 700;
  font-size: 18px;
}
.bicycle-order .mint-button{
  margin-bottom: 20px;
}
</style>
