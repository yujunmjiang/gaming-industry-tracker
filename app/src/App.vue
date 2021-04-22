<template>
  <div>
    <div id="nav">
      <router-link v-slot="{ isActive, isExactActive }" :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']"  to="/">Home</router-link>
      <router-link v-slot="{ isActive, isExactActive }" :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']" to="/getproduction">Production</router-link>
      <router-link v-slot="{ isActive, isExactActive }" :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']" to="/getrevenue">Revenue</router-link>
      <router-link v-slot="{ isActive, isExactActive }" :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']" to="/getcommunity">Community</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  /* background-color: black; */
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #9146ff;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  width: 225px;
  height: 40px;
  display: inline-block;
  border: 2px solid #000000;
  box-sizing: border-box;
  border-radius: 10px;
  margin-right: 15px;
  line-height: 40px;
  text-decoration: none;
}
#nav a:last-child {
  margin-right: 0px;
}
#nav a.router-link-exact-active {
  color: #9146ff;
  border-color: #9146FF;
}
</style>
