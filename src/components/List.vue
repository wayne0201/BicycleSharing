<template>
  <div class="list-page">
    {{val}}
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters} from 'vuex'
export default {
  name: 'List',
  data () {
    return {
      val: "list!"
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
