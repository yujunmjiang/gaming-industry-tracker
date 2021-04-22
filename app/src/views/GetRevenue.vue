<template>
<div id="RevenueContainer">
  <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :xs="20" :sm="16" :md="12" :lg="12" :xl="6">
        <div class="dataDes">
          <h1>Total Video Game Sales in the U.S.</h1>
          <p>One year ago, <a href="https://www.cdc.gov/">the Centers for Disease Control</a> (CDC) identified the first case of <span class="covid19">COVID-19</span> in the U.S., and the pandemic continues to cause significant risk to the public health and safety of the Nation. On March 13, 2020, President Donald Trump has declared the national emergency by the rapid spread of coronavirus disease. While cinemas and theaters closed their doors to try to stem the spread of the disease, many people turned to home entertainment during periods of self-isolation. The <a href="https://www.npd.com/wps/portal/npd/us/industry-expertise/video-games/">NPD Group</a> reported that video game sales in North America in March 2020 were up 34% from those in March 2019.</p>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" style="flex-wrap: wrap;" class="row-bg" justify="space-around">
      <el-col :xs="24" :sm="10" :md="10" :lg="8" :xl="8">
        <div class="grid-content">
          <div class="dataMap" id="map">
            <img alt="USA" src="../assets/usa.png">
          </div>
        </div>
      </el-col>     
      <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
        <div class="grid-content">
          <div class="dataViz" id="usRevChart">
            <LineChart id="chart1" title="Monthly revenue of the U.S. video game industry 2017-2021" xKey="date" yKey="total" :data="usvideogameRevenue"/>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :xs="20" :sm="16" :md="12" :lg="12" :xl="6">
        <div class="dataDes">
          <h1>Total Video Game Sales in the U.S.</h1>
          <p>One year ago, <a href="https://www.cdc.gov/">the Centers for Disease Control</a> (CDC) identified the first case of <span class="covid19">COVID-19</span> in the U.S., and the pandemic continues to cause significant risk to the public health and safety of the Nation. On March 13, 2020, President Donald Trump has declared the national emergency by the rapid spread of coronavirus disease. While cinemas and theaters closed their doors to try to stem the spread of the disease, many people turned to home entertainment during periods of self-isolation. The <a href="https://www.npd.com/wps/portal/npd/us/industry-expertise/video-games/">NPD Group</a> reported that video game sales in North America in March 2020 were up 34% from those in March 2019.</p>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" style="flex-wrap: wrap;" class="row-bg" justify="space-around">
      <el-col :xs="24" :sm="10" :md="10" :lg="8" :xl="8">
        <div class="grid-content">
          <div class="dataMap" id="map">
            <img alt="USA" src="../assets/usa.png">
          </div>
        </div>
      </el-col>     
      <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
        <div class="grid-content">
          <!-- <div class="dataViz" id="usRevChart">
            <LineChart id="chart2" title="Monthly revenue of the U.S. video game industry 2017-2021" xKey="date" yKey="total" :data="usvideogameRevenue"/>
          </div> -->
        </div>
      </el-col>
    </el-row>
</div>
</template>

<script>
import * as d3 from 'd3';
import LineChart from '@/components/LineChart.vue';

export default {
  name: 'GetRevenue',
  components: {
    LineChart
  },
  created(){
    Promise.all([
      d3.json('usvideogame_revenue.json')
    ])   
      .then(data => {
        this.usvideogameRevenue = data[0];
        console.log(data);
      })
  },
  data(){
    return {
      usvideogameRevenue: []
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