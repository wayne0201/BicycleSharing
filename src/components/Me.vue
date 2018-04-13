<template>
  <div class="me-page">
    {{val}}
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters} from 'vuex'
export default {
  name: 'Me',
  data () {
    return {
      val: "me!"
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
