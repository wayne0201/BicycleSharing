<template>
  <div class="bicycle-page">
    {{val}}
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters} from 'vuex'
export default {
  name: 'Bicycle',
  data () {
    return {
      val: "bicycle!"
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
