<template>
  <div class="hello">
    {{val}}
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters} from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      val: "Hello World!"
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
