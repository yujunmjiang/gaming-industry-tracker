<template>
  <div ref="container" class="svg-container" align="center">
    <h1>{{ title }}</h1>
    <!-- <svg v-if="redrawToggle === true" :width="svgWidth" :height="svgHeight * 2"> -->
    <svg :width="svgWidth + margin.left" :height="svgHeight * 1.5">
      <g :transform="'translate(' + margin.left + ',' + margin.top + ')'">
        <g>
          <path
            v-for="item in data"
            class="line-positive"
            :key="item[xKey]"
            :x="xScale(item[xKey])"
            :width="xScale.bandwidth()" 
          ></path>
        </g>
        <XAxis 
          :xScale="xScale" 
          :yTranslate="svgHeight"
          :id="id"
        />
        <YAxis 
          :yScale="yScale"
          :xTranslate="0"
          :id="id"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
import XAxis from './XAxis.vue';
import YAxis from './YAxis.vue';

export default {
  name: "LineChart",
  components: {
    XAxis,
    YAxis
  },
  props: {
    id: String,
    title: String,
    xKey: String,
    yKey: String,
    data: Array
  },
  data: () => ({
    margin: {top: 10, left: 50, bottom: 10, right: 50 },
    svgWidth: 0,
    redrawToggle: true,
    $container: null
  }),
  mounted(){
    this.$container = this.$refs.container
    window.addEventListener("resize", this.onResize);
    // this.svgWidth = document.getElementById("container").offsetWidth * 0.75;
    this.svgWidth = this.$container.offsetWidth * 0.75;
  },
  updated(){ 
    this.AnimateLoad();
    this.redrawToggle = true;
  },
  unmounted(){
    window.removeEventListener("resize", this.onResize)
  },
  methods: {
    AnimateLoad() {
      // d3.selectAll('rect')
      d3.select(this.$container).selectAll('path')
        .data(this.data)
        .attr('stroke-width', 1.5)
        // .attr('data', d3.line())
        .attr('y', this.yScale(0))
        .attr('height', 0)
        .transition()
        .delay((d, i) => {
          return i * 150;
        })
        .duration(1000)
        .attr("y", d => {
          return this.yScale(d[this.yKey]);
        })
        .attr("height", d => {
          return this.svgHeight - this.yScale(d[this.yKey]);
        });
        setTimeout(() => 300); // redraw the chart 300ms after the window has been resized
    },
    onResize() {
      // this.$svgWidth = document.getElementById("container").offsetWidth * 0.75;
      this.$svgWidth = this.$container.offsetWidth * 0.75;
      this.$data.redrawToggle = false;
    }
  },
  computed: {
    dataMax() {
      return d3.max(this.data, d => {
        return d[this.yKey];
      });
    },
    dataMin() {
      return d3.min(this.data, d => {
        return d[this.yKey];
      });
    },
    xScale() {
      return d3.scaleBand()
        .rangeRound([0, this.svgWidth])
        // .padding(0.1)
        .domain(
          this.data.map(d => {
            return d[this.xKey];
          })
        );
    },
    yScale() {
      return d3.scaleLinear()
        .rangeRound([this.svgHeight, 0])
        .domain([this.dataMin > 0 ? 0 : this.dataMin, this.dataMax]);
    },
    // id() {
    //   return `${this.xKey}-${this.yKey}`
    // },
    svgHeight() {
      return this.svgWidth / 1.61803398875; // golden ratio
    }
  }
};
</script>

<style scoped>
.line-positive {
  fill: none;
  stroke: #9146ff;
  /* stroke-width: 2px; */
  transition: r 0.2s ease-in-out;
}

.line-positive:hover {
  filter: brightness(125%)
}

.svg-container {
  display: inline-block;
  position: relative;
  width: 100%;
  padding-bottom: 1%;
  vertical-align: top;
  overflow: hidden;
}
</style>