<template>
  <div class="manage-page">
    <div class="manage-nav">
      <mt-button class="add-cycle"  @click="addCycle" size="small" :type="active ==='add-cycle' ? 'primary' : 'default'">
        <img :src="active ==='add-cycle' ? iconList[0] : iconList[1]" height="17" width="17" slot="icon">
        单车注册
      </mt-button>
      <mt-button class="subtract-cycle"  @click="subtractCycle" size="small" :type="active ==='subtract-cycle' ? 'primary' : 'default'">
        <img :src="active === 'subtract-cycle' ? iconList[2] : iconList[3]" height="17" width="17" slot="icon">
        单车销毁
      </mt-button>
    </div>
    <div class="manage-container">
      <mt-tab-container v-model="active" swipeable>
        <mt-tab-container-item id="add-cycle">
          <div class="field-box">
            <mt-header>
              <span slot="left" class="header-left">新增单车</span>
            </mt-header>
            <mt-field label="单车编号" placeholder="请输入单车编号" v-model="add_bicycle_id"></mt-field>
            <mt-field label="开锁密码" placeholder="请输入单车开锁密码" v-model="add_bicycle_pwd"></mt-field>
            <div class="add-btn">
              <mt-button type="primary" size="large" @click="createFn">新增提交</mt-button>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="subtract-cycle">
          <div class="field-box">
            <mt-header>
              <span slot="left" class="header-left">注销单车</span>
            </mt-header>
            <mt-field label="单车编号" placeholder="请输入单车编号" v-model="subtract_bicycle_id"></mt-field>
            <mt-field label="开锁密码" placeholder="请输入单车开锁密码" v-model="subtract_bicycle_pwd"></mt-field>
            <div class="add-btn">
              <mt-button type="primary" size="large" @click="removeFn">注销提交</mt-button>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters} from 'vuex'
export default {
  name: 'Manage',
  data () {
    return {
      add_bicycle_id: '',
      add_bicycle_pwd: '',
      subtract_bicycle_id: '',
      subtract_bicycle_pwd: '',
      active:"add-cycle",
      iconList: [require('../assets/add-white-icon.png'), require('../assets/add-icon.png'), require('../assets/subtract-white-icon.png'), require('../assets/subtract-icon.png')]
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
    addValidate() {
      const reg = /^\d{6}$/
      if(!reg.test(this.add_bicycle_id)){
        MessageBox("格式错误","请输入六位单车编号")
        return
      }else if (!reg.test(this.add_bicycle_pwd)){
        MessageBox("格式错误","请输入六位单车密码")
        return
      }
      return true
    },
    subtractValidate() {
      const reg = /^\d{6}$/
      if(!reg.test(this.subtract_bicycle_id)){
        MessageBox("格式错误","请输入六位单车编号")
        return
      }else if (!reg.test(this.subtract_bicycle_pwd)){
        MessageBox("格式错误","请输入六位单车密码")
        return
      }
      return true
    }
  },
  methods: {
    ...mapActions(["createBicycle", "removeBicycle"]),
    addCycle() {
      this.active = "add-cycle"
    },
    subtractCycle() {
      this.active = "subtract-cycle"
    },
    createFn() {
      if(!this.addValidate) return
      this.createBicycle({
        params:{
          bicycle_id: this.add_bicycle_id,
          bicycle_pwd: this.add_bicycle_pwd,
          enterprise_id: this.user.user_id
        },
        onSuccess: (data) => {
          this.add_bicycle_id = ''
          this.add_bicycle_pwd = ''
          Toast({
            message: '单车添加成功',
            iconClass: 'icon-success'
          });
        },
        onFail: (msg) => {
          Toast(this.user.msg)
          this.add_bicycle_id = ''
          this.add_bicycle_pwd = ''
        }
      })
    },
    removeFn() {
      if(!this.subtractValidate) return
      this.removeBicycle({
        params:{
          bicycle_id: this.subtract_bicycle_id,
          bicycle_pwd: this.subtract_bicycle_pwd,
          enterprise_id: this.user.user_id
        },
        onSuccess: (data) => {
          this.subtract_bicycle_id = ''
          this.subtract_bicycle_pwd = ''
          Toast({
            message: '单车注销成功',
            iconClass: 'icon-success'
          });
        },
        onFail: (msg) => {
          Toast(this.user.msg)
          this.subtract_bicycle_id = ''
          this.subtract_bicycle_pwd = ''
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.header-left{
  font-weight: 700;
  font-size: 18px;
}
.manage-nav{
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 64px;
  margin: 0 15px;
}
.add-cycle, .subtract-cycle{
  margin-left: 10px;
}
.add-btn{
  box-sizing: border-box;
  padding: 20px;
}
.icon-success{
  background-image: url('../assets/success.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  margin: 8px auto;
  width: 56px;
  height: 56px;
}
</style>
