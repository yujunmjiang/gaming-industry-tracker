<template>
<div>
  <ChartTitle>Most searched video games worldwide in 2020</ChartTitle>
  <div class="chart-body" ref="container">
    <svg
      :viewBox="`0 0 ${width} ${height}`"
      ref="svg"
    >
      <ChartYAxis
        :y="y"
        :tickPadding="20"
        :transform="`translate(${margin.left},0)`"
      />
      <g>
        <rect
          v-for="(s, i) in series"
          :key="s"
          class="hoverable"
          :class="types[i].toLowerCase()"
          :x="x(0)"
          :y="y(s)"
          :width="x(values[i]) - x(0)"
          :height="y.bandwidth()"
          fill="currentColor"
          @mouseenter="entered(i)"
          @mouseleave="left"
        ></rect>
      </g>
    </svg>
    <ChartTooltip
      :bounds-width="width"
      :x="tooltipX"
      :y="tooltipY"
      :show="tooltipShow"
    >
      <div v-if="tooltipData">
        <div class="tooltip-item tooltip-title">{{ tooltipData.name }}</div>
        <div class="tooltip-item">
          <div :class="tooltipData.type.toLowerCase()" class="tooltip-name">{{ tooltipData.type }}</div>
          <div>{{ formatValue(tooltipData.search_time) }}</div>
        </div>
      </div>
    </ChartTooltip>
  </div>
</div>
</template>

<script>
import { json, max, scaleBand, scaleLinear } from "d3";
import ChartTitle from "./ChartTitle.vue";
import ChartYAxis from "./ChartYAxis.vue";
import ChartTooltip from "./ChartTooltip.vue";

export default {
  components: {
    ChartTitle,
    ChartYAxis,
    ChartTooltip
  },
  data() {
    return {
      series: [],
      values: [],
      records: [],
      maxValue: 0,
      width: 300,
      height: 320,
      margin: {
        top: 10,
        right: 5,
        bottom: 10,
        left: 200
      },
      tooltipData: null,
      tooltipShow: false
    }
  },
  computed: {
    x() {
      return scaleLinear()
        .domain([0, this.maxValue])
        .range([this.margin.left, this.width - this.margin.right])
        .nice();
    },
    y() {
      return scaleBand()
        .domain(this.series)
        .range([this.margin.top, this.height - this.margin.bottom])
        .padding(0.4);
    },
    formatValue() {
      return v => `${v}M times`;
    },
    tooltipX() {
      return this.tooltipData !== null 
        ? this.x(this.tooltipData.search_time) 
        : -999;
    },
    tooltipY() {
      return this.tooltipData !== null 
        ? this.y(this.tooltipData.name) + this.y.bandwidth()
        : -999;
    }
  },
  created() {
    json('world_search.json')
    .then(data => {
      this.series = data.map(d => d.name);
      this.values = data.map(d => d.search_time);
      this.types = data.map(d => d.type);
      this.records = data;
      this.maxValue = max(data, d => d.search_time);
    });
  },
  mounted() {
    this.resize();
    window.addEventListener("resize", this.resize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.resize);
  },
  methods: {
    resize() {
      this.width = this.$refs.container.clientWidth;
    },
    entered(i) {
      this.tooltipShow = true;
      this.tooltipData = this.records[i];
    },
    left() {
      this.tooltipShow = false;
    }
  }
}
</script>

<style scoped>
.chart-body {
  position: relative;
}
.multiplayer {
  color: #9146FF;
}
.single-player {
  color: #F92772;
}
.hoverable:hover {
  filter: brightness(125%);
}
</style>