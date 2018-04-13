<template>
  <div class="manage-page">
    {{val}}
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters} from 'vuex'
export default {
  name: 'Manage',
  data () {
    return {
      val: "Manage!"
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
