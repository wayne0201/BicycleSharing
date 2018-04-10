<template>
  <div class="hello">
    {{val}}
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'HelloWorld',
  data () {
    return {
      val: ""
    }
  },
  mounted() {
    axios.get('/user/lll')
      .then(res => {
          if (res.status === 200 && res.data.code === 0){
            console.log(res.data)
            this.val = res.data.val
          } else {
          }
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
