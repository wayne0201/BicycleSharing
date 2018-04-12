<template>
  <div class="hello">
    {{val}}
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      val: "Hello World!"
    }
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
