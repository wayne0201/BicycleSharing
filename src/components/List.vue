<template>
  <div class="list-page">
    <div class="list-nav">
      <mt-button class="bicycle"  @click="bicycleList" size="small" :type="active ==='bicycle' ? 'primary' : 'default'">
        <img :src="active ==='bicycle' ? iconList[0] : iconList[1]" height="17" width="17" slot="icon">
        单车列表
      </mt-button>
      <mt-button class="fault-bicycle"  @click="faultList" size="small" :type="active ==='fault-bicycle' ? 'primary' : 'default'">
        <img :src="active === 'fault-bicycle' ? iconList[2] : iconList[3]" height="17" width="17" slot="icon">
        故障列表
      </mt-button>
    </div>
    <mt-header>
      <span slot="left" class="header-left">{{active ==='bicycle'? '单车列表' : '故障列表'}}</span>
    </mt-header>
    <div class="list-container">
      <mt-tab-container v-model="active">
        <mt-tab-container-item id="bicycle">
          <div class="list-body">
            <mt-loadmore :top-method="loadTop" ref="listLoadmore" :bottom-method="loadMore" v-if="bicycle_list.list.length > 0" :bottom-all-loaded="bicycle_list.next === 0">
              <mt-cell
                v-for="(item, index) in bicycle_list.list"
                :key="index"
                :title="'单车编号:' + item.bicycle_id"
                is-link
                :to="toLInk(item.bicycle_id)"
              >
                <span :class="cssList[item.bicycle_status]" >{{bicycleStatus[item.bicycle_status]}}</span>
              </mt-cell>
            </mt-loadmore>
            <div v-if="bicycle_list.next === 0" class="no-data">没有更多数据了</div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="fault-bicycle">
          <div class="list-body">
            <mt-loadmore :top-method="faultLoadTop" ref="faultLoadmore" :bottom-method="faultLoadMore" v-if="fault_list.list.length > 0" :bottom-all-loaded="fault_list.next === 0">
              <mt-cell
                v-for="(item, index) in fault_list.list"
                :key="index"
                :title="'单车编号:' + item.bicycle_id"
                is-link
                :to="toLInk(item.bicycle_id)"
              >
                <span :class="cssList[item.bicycle_status]" >{{bicycleStatus[item.bicycle_status]}}</span>
              </mt-cell>

            </mt-loadmore>
            <div v-if="fault_list.next === 0" class="no-data">没有更多数据了</div>
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
      bicycleStatus:['闲置', '正被使用', '故障'],
      cssList: ['no-use', 'use', 'fault'],
      iconList: [require('../assets/bicycle-list-white-icon.png'), require('../assets/bicycle-list-icon.png'), require('../assets/fault-white-icon.png'), require('../assets/fault-icon.png')]
    }
  },
  computed: {
    ...mapState({
      bicycle_list: state => state.list.bicycle_list,
      fault_list: state => state.list.fault_list,
      user: state => state.user
    })
  },
  methods: {
    ...mapActions(["getList", "getListMore", "getFaultListMore", "getFaultList"]),
    bicycleList() {
      this.active = "bicycle"
    },
    faultList() {
      this.active = "fault-bicycle"
    },
    loadTop() {
      let params = {
        enterprise_id: this.user.user_id,
        size: 10
      }
      this.getList({
        params,
        onSuccess: () => {
          this.$refs.listLoadmore.onTopLoaded();
        },
        onFail: () => {
          this.$refs.listLoadmore.onTopLoaded();
          Toast(this.user.msg)
        }
      })
    },
    loadMore() {
      let params = {
        enterprise_id: this.user.user_id,
        size: 10,
        page: this.bicycle_list.page
      }
      this.getListMore({
        params,
        onSuccess: () => {
          this.$refs.listLoadmore.onBottomLoaded();
        },
        onFail: () => {
          this.$refs.listLoadmore.onBottomLoaded();
          Toast(this.user.msg)
        }
      })
    },
    faultLoadTop() {
      let params = {
        enterprise_id: this.user.user_id,
        size: 10
      }
      this.getFaultList({
        params,
        onSuccess: () => {
          this.$refs.faultLoadmore.onTopLoaded();
        },
        onFail: () => {
          this.$refs.faultLoadmore.onTopLoaded();
          Toast(this.user.msg)
        }
      })
    },
    faultLoadMore() {
      let params = {
        enterprise_id: this.user.user_id,
        size: 10,
        page: this.bicycle_list.page
      }
      this.getFaultListMore({
        params,
        onSuccess: () => {
          this.$refs.faultLoadmore.onBottomLoaded();
        },
        onFail: () => {
          this.$refs.faultLoadmore.onBottomLoaded();
          Toast(this.user.msg)
        }
      })
    },
    toLInk(id) {
      return `/detail/${id}`
    }
  },
  mounted() {
    let params = {
      enterprise_id: this.user.user_id,
      size: 10
    }
    this.getList({
      params,
      onFail: () => {
        Toast(this.user.msg)
      }
    })
    this.getFaultList({
      params,
      onFail: () => {
        Toast(this.user.msg)
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.header-left{
  font-weight: 700;
  font-size: 18px;
}
.list-nav{
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 64px;
  margin: 0 15px;
}
.list-container{
  overflow: auto;
  flex: 1;
}
.bicycle, .fault-bicycle{
  margin-left: 10px;
}
.no-data{
  padding: 10px 0;
  text-align: center;
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

