<template>
  <div id="container" class="svg-container" align="center">
    <h1>{{ title }}</h1>
    <svg v-if="redrawToggle === true" :width="svgWidth * 3" :height="svgHeight * 3">
      <g>
        <rect
          v-for="item in data"
          class="bar-positive"
          :key="item[xKey]"
          :x="xScale(item[xKey])"
          :width="xScale.bandwidth()"       
        ></rect>
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
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
import XAxis from './XAxis.vue';
import YAxis from './YAxis.vue';

export default {
  name: "BarChart",
  props: {
    title: String,
    xKey: String,
    yKey: String,
    data: Array
  },
  components: {
    XAxis,
    YAxis
  },
  mounted(){
    window.addEventListener("resize", this.onResize)
  },
  updated(){
    this.svgWidth = document.getElementById("container").offsetWidth * 0.75;
    this.AnimateLoad();
  },
  unmounted(){
    window.removeEventListener("resize", this.onResize)
  },
  data: () => ({
    svgWidth: 0,
    redrawToggle: true
  }),
  methods: {
    AnimateLoad() {
      d3.selectAll("rect")
        .data(this.data)
        // .style("fill", "#9146ff")
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
    },
    // textRotate() {
    //   svg.apepnd("XAxis")
    //      .attr("class", "x axis")
    //      .attr("transform", "translate(0, " + height + ")")
    //      .call
    // }
    onResize() {
      // redraw the chart 300ms after the window has been resized
      this.$data.redrawToggle = false;
        setTimeout(() => {
          this.$data.redrawToggle = true;
          this.$data.svgWidth =
            document.getElementById("container").offsetWidth * 0.75;
          this.AnimateLoad();
        }, 300);
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
    id() {
      return `${this.xKey}-${this.yKey}`
    },
    xScale() {
      return d3.scaleBand()
        .rangeRound([0, this.svgWidth])
        .padding(0.1)
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
    svgHeight() {
      return this.svgWidth / 1.61803398875; // golden ratio
    }
  }
};
</script>

<style scoped>
.bar-positive {
  fill: #9146ff;
  transition: r 0.2s ease-in-out;
}

.bar-positive:hover {
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