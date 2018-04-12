<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import { mapActions} from 'vuex'
export default {
  name: 'App',
  methods:{
    ...mapActions(["getInfo"])
  },
  mounted() {
    this.getInfo({
      onSuccess: () => this.$router.push("/"),
      onFail: () => this.$router.push("/login")
    })
  }
}
</script>

<style>
#app{
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  background: #f8f8f8;
}
</style>
