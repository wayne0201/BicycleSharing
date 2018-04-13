<template>
  <div class="order-page">
    {{val}}
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters} from 'vuex'
export default {
  name: 'Order',
  data () {
    return {
      val: "order!"
    }
  },
  computed: {
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
