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
              <mt-button type="primary" size="large" >新增提交</mt-button>
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
              <mt-button type="primary" size="large" >注销提交</mt-button>
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
  methods: {
    addCycle() {
      this.active = "add-cycle"
    },
    subtractCycle() {
      this.active = "subtract-cycle"
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header-left{
  font-weight: 700;
  font-size: 18px;
}
.manage-nav{
  display: flex;
  padding: 15px 0;
  margin: 0 15px;
}
.add-cycle, .subtract-cycle{
  margin-left: 10px;
}
.add-btn{
  box-sizing: border-box;
  padding: 20px;
}
</style>
