<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'App',
  data(){
    return {
      softwareDevelopment: null,
    }
  },
  // props: {
  //   softwareDevelopment: Array,
  // },
  mounted(){
    Promise.all([
      d3.csv('software_development.csv')
    ])
      .then(data => {
        this.softwareDevelopment = data[0];
        console.log(data);
      })
  }
}
</script>

<style>
@import './assets/styles/main.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
