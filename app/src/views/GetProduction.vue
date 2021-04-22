<template>
  <!-- Hardware Manufacturing -->
  <div id="ProductionContainer">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <h1 class="text-center" style="margin: 0">Hardware Manufacturing</h1>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="grid-content">
              <div class="dataMap" id="map">
                <img alt="China" src="../assets/china.png">
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="dataDes">
              <p>Chinese market research company <a href="https://www.trendforce.com/presscenter/news/20200217-10223.html">TrendForce</a> expects global smartphone production in the first quarter to be 10 percent lower than originally expected due to the <span class="covid19">COVID-19</span> pandemic. The negative effects on output won’t be limited to the smartphone industry, however, as the following chart shows. Smartwatches, notebooks, smart speakers and video game consoles are all expected to suffer double-digit hits on unit shipments this quarter, with TV shipments expected to be 4.5 percent lower than forecast before the outbreak.</p>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" style="flex-wrap: wrap;" class="row-bg" justify="center">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="grid-content">
              <div class="dataViz" id="hardManChart">
                <BarChart id="chart1" title="Estimated impact of the COVID-19 outbreak on global tech shipments in Q1 2020" xKey="device" yKey="revised" :data="hardwareManufacturing"/>
              </div>
            </div>
          </el-col>
        </el-row>

        <h1 class="text-center" style="margin: 0">Software Development</h1>
        <!-- Software Development -->
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="grid-content">
              <div class="dataMap" id="map">
                <img alt="Denmark" src="../assets/denmark.png">
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="dataDes">
              <p>The <a href="http://www.egdf.eu/">European Game Developer Federation</a> (EGDF) recently conducted a survey, to examine the consequences of the <span class="covid19">COVID-19</span> pandemic for the European Game developers. Interactive Denmark helped distribute survey to the Danish games industry, and as a result we now have the results of the survey on a European level, as well as local results based on the 16 Danish companies, that responded.</p>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" style="flex-wrap: wrap;" class="row-bg" justify="space-around">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="grid-content">
              <div class="dataViz" id="softDevChart">
                <BarChart id="chart2" title="How is COVID-19 affecting game development practices?" xKey="category" yKey="percentage" :data="softwareDevelopment"/>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
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
    Promise.all([
      d3.json('hardware_manufacturing.json'),
      d3.json('software_development.json')
    ])
      .then(data => {
        this.hardwareManufacturing = data[0];
        this.softwareDevelopment = data[1];
        console.log(data);
      })
  },
  data(){
    return {
      hardwareManufacturing: [],
      softwareDevelopment: []
    }
  },
  methods: {

  }
}
</script>

<style scoped>
  h1{
    font-family: 'Roboto', sans-serif;
    font-size: 2em;
    font-weight: 700;
    text-align: center;
    margin: 1em 1em;
  }
  p{
    font-family: 'Roboto', sans-serif;
    font-size: 1em;
    font-weight: 300;
    color: black;
    text-align: left;
    line-height: 1.5;
  }
  a{
    font-family: 'Roboto', sans-serif;
    font-size: 1em;
    font-weight: 600;
    color: black;
  }
  .covid19{
    font-family: 'Roboto', sans-serif;
    font-size: 1em;
    font-weight: 600;
    color: #00e4c9;
  }
  .text-center {
    text-align: center;
  }
  img{
    width: 100%;
    height: auto;
    margin: 0em 0em;
  }
  .dataViz {
    font-family: 'Roboto', sans-serif;
    font-size: 0.5em;
    color: black;
    text-align: center;
    /* margin: 5em 0em; */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .row-bg {
    padding: 10px 0;
  }
  .grid-content {
    text-align: center;
    overflow: hidden;
    padding: 10px;
  }
</style>
