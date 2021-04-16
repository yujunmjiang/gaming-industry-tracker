<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>HOW COVID-19 HAS CHANGED THE VIDEO GAME INDUSTRY.</p>
    <h3>By Yujun Jiang</h3>
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  font-family: 'Roboto', sans-serif;
  font-size: 1em;
  font-weight: 600;
  color: black;
  margin: 40px 0 0;
}
p{
  font-family: 'Roboto', sans-serif;
  font-size: 1em;
  font-weight: 300;
  color: black;
  text-align: center;
  line-height: 1.5;
  margin-left: 25%;
  margin-right: 25%;
}
</style>
