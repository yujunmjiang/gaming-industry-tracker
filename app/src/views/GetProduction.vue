<template>
  <div id="ProductionContainer">
    <topNavBarLinks></topNavBarLinks>
    <h1>Production Process Challenges Summary</h1>
    <!-- <div id="topGames">
      <div class="topGames" v-for='topGame in listOfTopGames'
      :key='topGame.gameID'>
        <a href="">
          <div class="topGameThumbnailContainer">
            <img class="topGameThumbnail" :src="`${topGame.gameBoxArtURL}`" alt="">
          </div>
          <div class="topGameDescription">
            {{ topGame.gameName }}
          </div>
        </a>
      </div>
    </div> -->
  </div>
</template>

<script>
import topNavBarLinks from '../components/topNavBarLinks';
// import * as d3 from 'd3';

export default {
  name: 'GetProduction',
  data(){
    return {
      // softwareDevelopment: null,
    }
  },
  components: {
    topNavBarLinks,
  },
  // mounted(){
  //   Promise.all([
  //     d3.csv('software_development.csv')
  //   ])
  //     .then(data => {
  //       this.softwareDevelopment = data[0];
  //       console.log(data);
  //     })
  // },
  methods: {

  }
}
</script>

<style>

</style>
