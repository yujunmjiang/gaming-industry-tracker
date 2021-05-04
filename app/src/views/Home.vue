<template>
  <div class="home">
    <img alt="Project Logo" src="../assets/logo.png" width="220" height="230" style="margin: 5em 0">
    <HelloWorld msg="A Different Game"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
