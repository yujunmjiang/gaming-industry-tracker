<template>
  <div id="ProductionContainer">
    <h1>Production Process Challenges Summary</h1>
    <div class="dataViz" id="softDevChart" :softwareDevelopment="softwareDevelopment">
      <BarChart title="How is COVID-19 affecting game development practices?" xKey="category" yKey="percentage" :data="softwareDevelopment"/>
    </div>

  </div>
</template>

<script>
import * as d3 from 'd3';
import BarChart from '@/components/BarChart.vue';

export default {
  name: 'GetProduction',
  components: {
    BarChart
  },
  created(){
    d3.json('software_development.json')   
      .then(data => {
        this.softwareDevelopment = data;
        console.log(data);
      })
  },
  data(){
    return {
      softwareDevelopment: []
    }
  },
  methods: {

  }
}
</script>

<style>
#softDevChart {
  font-family: 'Roboto Mono', monospace;
  font-size: 10px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin-top: 30px;
}
</style>
