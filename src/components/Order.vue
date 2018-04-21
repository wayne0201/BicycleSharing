<template>
  <div class="order-page">
    <mt-header>
      <span slot="left" class="header-left">骑行订单</span>
    </mt-header>
    <div class="order-body">
      <mt-loadmore :top-method="loadTop" ref="loadmore" :bottom-method="loadMore" v-if="list.length > 0" :bottom-all-loaded="order.next === 0">
        <ul>
          <li v-for="(item, index) in list" :key="index" class="order-item-wrap">
            <div class="item-title">
              单车: {{item.bicycle_id}}
              <div class="item-id">订单号: {{item.order_id}}</div>
            </div>
            <div class="item-content">
              <div class="item-left">
                <div class="time-box">
                  <div class="create-time">
                    {{timeInit(item.create_time)}}
                  </div>
                  <div class="end-time">
                    {{item.end_time ? timeInit(item.end_time) : '---------------'}}
                  </div>
                </div>
              </div>
              <div class="item-right" :class="classList[item.order_status]">
                {{statusList[item.order_status]}}
              </div>
            </div>
          </li>
          <div v-if="order.next === 0" class="no-data">没有更多数据了</div>
        </ul>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters} from 'vuex'
export default {
  name: 'Order',
  data () {
    return {
      classList:["success", "rent", "warning"],
      statusList: ["已归还", "正在使用", "故障"],
      popupVisible: true
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      order: state => state.order
    }),
    list(){
      return this.order.order_list
    }
  },
  methods: {
    ...mapActions(['getOrderList', 'getOrderListMore']),
    loadTop() {
      let params = {
        personal_id: this.user.user_id,
        size: 5
      }
      this.getOrderList({
        params,
        onSuccess: () => {
          this.$refs.loadmore.onTopLoaded();
        },
        onFail: () => {
          this.$refs.loadmore.onTopLoaded();
          Toast(this.user.msg)
        }
      })
    },
    loadMore() {
      let params = {
        personal_id: this.user.user_id,
        size: 5,
        page: this.order.page
      }
      this.getOrderListMore({
        params,
        onSuccess: () => {
          this.$refs.loadmore.onBottomLoaded();
        },
        onFail: () => {
          this.$refs.loadmore.onBottomLoaded();
          Toast(this.user.msg)
        }
      })
    },
    timeInit(time){
      let _time = new Date(time)
      return _time.getFullYear() + "/"+ (_time.getMonth() + 1) + "/"+ _time.getDate() + "/ "+ _time.getHours() + "点" + _time.getMinutes() + "分"
    }
  },
  mounted() {
    let params = {
      personal_id: this.user.user_id,
      size: 5
    }
    this.getOrderList({
      params,
      onFail: () => {
        Toast(this.user.msg)
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header-left{
  font-weight: 700;
  font-size: 18px;
}
.order-body{
  flex: 1;
  overflow: auto;
}
.order-item-wrap{
  background: #fff;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 15px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.order-item-wrap:first-of-type{
  margin: 0
}
.order-item-wrap:last-of-type{
  margin: 0
}
.item-title{
  padding-bottom: 10px;
  font-size: 24px;
  font-weight: 700;
  color: #26a2ff;
  line-height: 1.3;
  border-bottom: 1px solid #999;
}
.item-id{
  font-size: 16px;
  color: #999;
}
.item-content{
  display: flex;
}
.item-left{
  flex: 1;
}
.time-box{
  margin-top: 10px;
  color: #555;
  font-size: 17px;
}
.item-right{
  font-size: 18px;
  width: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.warning{
  color: #f44336;
}
.success{
  color: #333;
}
.rent{
  color: #999;
}
.create-time{
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}
.create-time::before{
  content: " ";
  height: 8px;
  width: 8px;
  border-radius: 100%;
  margin-right: 6px;
  background: #4caf50;
}
.end-time{
  display: flex;
  align-items: center;
}
.end-time::before{
  content: " ";
  height: 8px;
  width: 8px;
  border-radius: 100%;
  margin-right: 6px;
  background: #ffc107;
}
.no-data{
  padding: 10px 0;
  text-align: center;
}
</style>
