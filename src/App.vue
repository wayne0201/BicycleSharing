<template>
  <div id="app">
    <keep-alive>
      <router-view class="page"/>
    </keep-alive>
    <div class="tab" v-if="hasTab">
      <mt-tabbar v-model="route">
        <template v-for="(item, index) in tabList">
          <mt-tab-item :id="item.path"  :key="index">
            <img :src="item.icon" slot="icon">
            {{item.name}}
          </mt-tab-item>
        </template>
      </mt-tabbar>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters} from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      routeList: [
        [{
          path: '/bicycle',
          icon: require('./assets/bicycle-icon.png'),
          name: '单车'
        },{
          path: '/order',
          icon: require('./assets/order-icon.png'),
          name: '订单'
        }, {
          path: '/me',
          icon: require('./assets/me-icon.png'),
          name: '我的'
        }],
        [{
          path: '/list',
          icon: require('./assets/list-icon.png'),
          name: '列表'
        },{
          path: '/manage',
          icon: require('./assets/manage-icon.png'),
          name: '管理'
        }, {
          path: '/me',
          icon: require('./assets/me-icon.png'),
          name: '我的'
        }]
      ]
    }
  },
  computed: {
    ...mapGetters(['isEnterprise']),
    hasTab() {
      return this.routeList[0].filter(v => v.path === this.$route.path).length || this.routeList[1].filter(v => v.path === this.$route.path).length
    },
    tabList() {
      if(this.isEnterprise){
        return this.routeList[1]
      } else {
        return this.routeList[0]
      }
    },
    route: {
      get: function () {
        return this.$route.path
      },
      set: function (newValue) {
        this.$router.push(newValue)
      }
    }
  },
  methods:{
    ...mapActions(["getInfo"])
  },
  watch: {
    route(val, oldVal) {
      this.$router.push(val)
    }
  },
  mounted() {
    this.getInfo({
      onSuccess: () => {
        if(this.isEnterprise){
          return this.$router.push("/list")
        } else {
          return this.$router.push("/bicycle")
        }
      },
      onFail: () => this.$router.push("/login")
    })
  }
}
</script>

<style>
#app{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  background: #f8f8f8;
  display: flex;
  flex-direction:column;
}
#app .page{
  flex: 1;
}
#app .tab{
  height: 55px;
  overflow: hidden;
}
</style>
