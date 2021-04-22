<template>
<div id="RevenueContainer">
  <h1 class="text-center" style="margin: 0">Total Video Game Sales in the U.S.</h1>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <el-row type="flex" justify="center">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <div class="grid-content">
                <div class="dataMap" id="map">
                  <img alt="USA" src="../assets/usa.png">
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="dataDes">
            <p>One year ago, <a href="https://www.cdc.gov/">the Centers for Disease Control</a> (CDC) identified the first case of <span class="covid19">COVID-19</span> in the U.S., and the pandemic continues to cause significant risk to the public health and safety of the Nation. On March 13, 2020, President Donald Trump has declared the national emergency by the rapid spread of coronavirus disease. While cinemas and theaters closed their doors to try to stem the spread of the disease, many people turned to home entertainment during periods of self-isolation. The <a href="https://www.npd.com/wps/portal/npd/us/industry-expertise/video-games/">NPD Group</a> reported that video game sales in North America in March 2020 were up 34% from those in March 2019.</p>
          </div>
        </el-col>

        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="grid-content">
            <div class="dataViz" id="usRevChart">
              <USRevChart/>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</div>
</template>

<script>
import USRevChart from '@/components/USRevChart.vue';

export default {
  name: 'GetRevenue',
  components: {
    USRevChart
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
  .text-center {
    text-align: center;
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
