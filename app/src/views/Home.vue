<template>
  <div class="home">
    <img alt="Project Logo" src="../assets/logo.png" width="132" height="138">
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