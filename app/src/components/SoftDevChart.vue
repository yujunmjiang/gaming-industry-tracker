<template>
<div>
  <ChartTitle>How is COVID-19 affecting game development practices?</ChartTitle>
  <div class="chart-body" ref="container">
    <svg
      :viewBox="`0 0 ${width} ${height}`"
      ref="svg"
    >
      <ChartYAxis
        :y="y"
        :tickPadding="20"
        :transform="`translate(${margin.left},0)`"
        :wrap-width="margin.left - 20"
      />
      <g>
        <rect
          v-for="(s, i) in series"
          :key="s"
          class="value hoverable"
          :x="x(0)"
          :y="y(s)"
          :width="x(values[i]) - x(0)"
          :height="y.bandwidth()"
          fill="currentColor"
          @mouseenter="entered(i)"
          @mouseleave="left"
        ></rect>
      </g>
      <g :transform="`translate(${x(calloutValue) + 30},0)`"
        v-show="width > 450"
      >
        <path
          stroke="currentColor"
          :d="calloutPath"
        ></path>
        <text
          class="callout value"
          :y="calloutY"
          dy="0.32em"
          text-anchor="middle"
          fill="currentColor"
        >60%</text>
        <text
          x="40"
          :y="calloutY"
          dy="0.32em"
          fill="currentColor"
        >are affected</text>
      </g>
    </svg>
    <ChartTooltip
      :bounds-width="width"
      :x="tooltipX"
      :y="tooltipY"
      :show="tooltipShow"
    >
      <div v-if="tooltipData">
        <div class="tooltip-item">
          <div class="tooltip-name value">{{ tooltipData.category }}</div>
          <div>{{ formatValue(tooltipData.percentage) }}</div>
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
      calloutValue: 0,
      maxValue: 0,
      width: 300,
      height: 320,
      margin: {
        top: 10,
        right: 5,
        bottom: 10,
        left: 240
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
    calloutY0() {
      if (this.series.length === 0) {
        return 0;
      } else {
        return this.y(this.series[1]);
      }
    },
    calloutY1() {
      if (this.series.length === 0) {
        return 0;
      } else {
        return this.y(this.series[this.series.length - 1]) + this.y.bandwidth();
      }
    },
    calloutY() {
      return (this.calloutY0 + this.calloutY1) / 2;
    },
    calloutPath() {
      return `M-5,${this.calloutY0} H5 M0,${this.calloutY0} V${this.calloutY - 20} M0,${this.calloutY + 20} V${this.calloutY1} M-5,${this.calloutY1} H5`;
    },
    formatValue() {
      return v => `${v}%`;
    },
    tooltipX() {
      return this.tooltipData !== null 
        ? this.x(this.tooltipData.percentage) 
        : -999;
    },
    tooltipY() {
      return this.tooltipData !== null 
        ? this.y(this.tooltipData.category) + this.y.bandwidth()
        : -999;
    }
  },
  created() {
    json('software_development.json')
    .then(data => {
      this.series = data.map(d => d.category);
      this.values = data.map(d => d.percentage);
      this.records = data;
      this.maxValue = max(data, d => d.percentage);
      this.calloutValue = max(data.filter(d => d.percentage !== this.maxValue), d => d.percentage);
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
.value {
  color: #9146FF;
}
.callout {
  font-size: 36px;
}
.hoverable:hover {
  filter: brightness(125%);
}
</style>