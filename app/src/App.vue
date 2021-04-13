<template>
  <div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/getproduction">Production</router-link> |
      <router-link to="/getrevenue">Revenue</router-link> |
      <router-link to="/getcommunity">Community</router-link> 
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  background-color: black;
  font-family: 'Roboto Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #5758bb;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #5758bb;
}
</style>
