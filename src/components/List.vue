<template>
  <div class="list-page">
    <div class="list-nav">
      <mt-button class="bicycle"  @click="list" size="small" :type="active ==='bicycle' ? 'primary' : 'default'">
        <img :src="active ==='bicycle' ? iconList[0] : iconList[1]" height="17" width="17" slot="icon">
        单车列表
      </mt-button>
      <mt-button class="fault-bicycle"  @click="faultList" size="small" :type="active ==='fault-bicycle' ? 'primary' : 'default'">
        <img :src="active === 'fault-bicycle' ? iconList[2] : iconList[3]" height="17" width="17" slot="icon">
        故障列表
      </mt-button>
    </div>
    <div class="list-container">
 <mt-tab-container v-model="active" swipeable>
        <mt-tab-container-item id="bicycle">
          <div class="list-box">
            <mt-header>
              <span slot="left" class="header-left">单车列表</span>
            </mt-header>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="fault-bicycle">
          <div class="list-box">
            <mt-header>
              <span slot="left" class="header-left">故障列表</span>
            </mt-header>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters} from 'vuex'
export default {
  name: 'List',
  data () {
    return {
      active: 'bicycle',
      iconList: [require('../assets/bicycle-list-white-icon.png'), require('../assets/bicycle-list-icon.png'), require('../assets/fault-white-icon.png'), require('../assets/fault-icon.png')]
    }
  },
  computed: {
  },
  methods: {
    list() {
      this.active = "bicycle"
    },
    faultList() {
      this.active = "fault-bicycle"
    },
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header-left{
  font-weight: 700;
  font-size: 18px;
}
.list-nav{
  display: flex;
  padding: 15px 0;
  margin: 0 15px;
}
.bicycle, .fault-bicycle{
  margin-left: 10px;
}
</style>
