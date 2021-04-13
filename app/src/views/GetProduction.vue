<template>
  <div id="ProductionContainer">
    <h1>Production Process Challenges Summary</h1>
    <div class="dataViz" id="softDevChart" :softwareDevelopment="softwareDevelopment">
      <BarChart title="How is COVID-19 affecting game development practices?" xKey="category" yKey="percentage" :data="softwareDevelopment"/>
    </div>

  </div>
</template>

<script>
// import topNavBarLinks from '../components/topNavBarLinks';
import * as d3 from 'd3';
import BarChart from '@/components/BarChart.vue';

export default {
  name: 'GetProduction',
  data(){
    return {
      softwareDevelopment: [],
    }
  },
  components: {
    BarChart
  },
  mounted(){
    Promise.all([
      d3.csv('software_development.csv')
    ])
      .then(data => {
        this.softwareDevelopment = data[0];
        console.log(data);
      })
  },
  methods: {

  }
}
</script>

<style>
#softDevChart {
  font-family: 'Roboto Mono', monospace;
  font-size: 12px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #282f36;
  margin-top: 30px;
}
</style>
