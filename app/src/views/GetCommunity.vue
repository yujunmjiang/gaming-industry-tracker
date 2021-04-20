<template>
<div id="CommunityContainer">
  <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :xs="20" :sm="16" :md="12" :lg="12" :xl="6">
        <div class="dataDes">
          <h1>Community</h1>
          
        </div>
      </el-col>
    </el-row>

</div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'GetCommunity',
  created(){
    Promise.all([
      d3.json('usvideogame_timespend.json')
    ])   
      .then(data => {
        this.usvideogameTimespend = data[0]
        console.log(data);
      })
  },
  data(){
    return {
      usvideogameTimespend: []
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