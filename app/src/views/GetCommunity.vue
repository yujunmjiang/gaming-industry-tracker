<template>
<div id="CommunityContainer">
  <h1 class="text-center" style="margin: 0">Gaming As a Social Activity</h1>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-row type="flex" justify="center">
            <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
              <div class="grid-content">
                <div class="dataMap" id="map">
                  <img alt="USA" src="../assets/worldwide_map.png">
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="dataDes">
            <p>In July 2020, 54 percent of new gamers from the United States who took up gaming during the <span class="covid19">COVID-19</span> pandemic reported that they preferred being part of a team when playing against others. Overall, 49 percent of gamers from the UK and 44 percent from South Korea reported the same.</p>
          </div>
        </el-col>

        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="grid-content">
            <div class="dataViz">
              <WorldSocialActChart/>
            </div>
          </div>
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="grid-content">
            <div class="dataViz">
              <USTimespendChart/>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="grid-content">
            <div class="dataDes">
              <p>As a result of the <span class="covid19">COVID-19</span> pandemic in 2020, many people turned to video gaming as a form of entertainment during long periods of being locked down at home. During a survey in the United States in June 2020, respondents stated that their time spent playing battle royale games had increased by 143 percent. PC gamers stated that their time spent playing fighting games had increased by 24 percent. Console gamers stated that their time spent playing rhythm games had increased by 57 percent.</p>
            </div>
          </div>
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="grid-content">
            <div class="dataDes">
              <p>The video game that was most searched for worldwide during 2020 was Among Us, an online game available on PC and mobile developed by InnerSloth. The social deduction game peaked at 68 million monthly searches. The second-most searched for video game was Riot Games' Valorant, with a maximum monthly search volume of 24.9 million.</p>
            </div>

          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="grid-content">
            <div class="dataViz">
              <WorldSearchChart/>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</div>
</template>

<script>
import WorldSocialActChart from "@/components/WorldSocialActChart";
import USTimespendChart from "@/components/USTimespendChart";
import WorldSearchChart from "@/components/WorldSearchChart";

export default {
  name: 'GetCommunity',
  components: {
    WorldSocialActChart,
    USTimespendChart,
    WorldSearchChart
  },
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
    font-size: 12px;
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
