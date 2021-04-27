<template>
  <div>
    <ChartTitle>Monthly revenue of the U.S. video game industry 2017-2021</ChartTitle>
    <div class="chart-body" ref="container">
      <svg 
        :viewBox="`0 0 ${width} ${height}`"
        ref="svg"
        @mousemove="moved"
        @mouseenter="entered"
        @mouseleave="left"
      >
        <ChartXAxis
          :x="x"
          :tick-values="xTickValues"
          :tick-format="xTickFormat"
          :transform="`translate(0,${height - margin.bottom})`"
        />
        <ChartYAxis
          :y="y"
          :transform="`translate(${margin.left},0)`"
        />
        <g>
          <g v-for="s in series" :key="s.name" :class="s.name">
            <path
              fill="none"
              stroke-width="2"
              stroke="currentColor"
              :d="lineGenerator(s.values)"
            ></path>
            <circle
              v-for="(v, i) in s.values"
              :key="i"
              :cx="x(i)"
              :cy="y(v)"
              r="5"
              fill="#ffffff"
              stroke-width="2"
              stroke="currentColor"
            ></circle>
          </g>
        </g>
        <line
          stroke="currentColor"
          stroke-dasharray="3 4"
          :y1="margin.top"
          :y2="height - margin.bottom"
          :transform="`translate(${tooltipX},0)`"
        ></line>
      </svg>
      <ChartTooltip
        :bounds-width="width"
        :x="tooltipX"
        :y="tooltipY"
        :show="tooltipShow"
      >
        <div v-if="tooltipI !== null">
          <div class="tooltip-item tooltip-title">{{ dates[tooltipI] }}</div>
          <div v-for="s in series" :key="s.name" class="tooltip-item">
            <div :class="s.name" class="tooltip-name">{{ s.name }}</div>
            <div>{{ formatValue(s.values[tooltipI]) }}</div>
          </div>
        </div>
      </ChartTooltip>
    </div>
  </div>
</template>

<script>
import { json, scaleLinear, min, max, line, range, pointer } from "d3";
import ChartTitle from "./ChartTitle.vue";
import ChartXAxis from "./ChartXAxis.vue";
import ChartYAxis from "./ChartYAxis.vue";
import ChartTooltip from "./ChartTooltip.vue";

export default {
  components: {
    ChartTitle,
    ChartXAxis,
    ChartYAxis,
    ChartTooltip
  },
  data() {
    return {
      dates: [],
      series: [],
      minValue: 0,
      maxValue: 0,
      width: 300,
      height: 400,
      margin: {
        top: 10,
        right: 5,
        bottom: 60,
        left: 30
      },
      tooltipI: null,
      tooltipY: 0,
      tooltipShow: false
    }
  },
  computed: {
    x() {
      return scaleLinear()
        .domain([-1, this.dates.length])
        .range([this.margin.left, this.width - this.margin.right]);
    },
    y() {
      return scaleLinear()
        .domain([this.minValue, this.maxValue])
        .range([this.height - this.margin.bottom, this.margin.top])
        .nice();
    },
    lineGenerator() {
      return line()
        .x((d, i) => this.x(i))
        .y(d => this.y(d));
    },
    xTickValues() {
      return range(0, this.dates.length);
    },
    xTickFormat() {
      return (i) => this.dates[i];
    },
    tooltipX() {
      return this.tooltipShow && this.tooltipI !== null ? this.x(this.tooltipI) : -999;
    }
  },
  created() {
    json('usvideogame_revenue.json')
    .then(data => {
      this.dates = data.map(d => d.date);
      this.series = ["total", "hardware", "software", "accessories"].map(s => ({
        name: s,
        values: data.map(d => d[s] === "-" ? d["game_content"] : d[s])
      }));
      this.minValue = min(this.series, s => min(s.values));
      this.maxValue = max(this.series, s => max(s.values));
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
    moved(event) {
      const p = pointer(event, this.$refs.svg);
      const xm = this.x.invert(p[0]);
      const i = Math.min(Math.max(0, Math.round(xm)), this.dates.length - 1);
      if (i !== this.tooltipI) {
        this.tooltipI = i;
      }
    },
    entered() {
      this.tooltipShow = true;
    },
    left() {
      this.tooltipShow = false;
      this.tooltipI = null;
    },
    formatValue(v) {
      return `$ ${v.toFixed(2)}B`
    }
  }
}
</script>

<style scoped>
.chart-body {
  position: relative;
}
.total {
  color: #9146ff;
}
.hardware {
  color: #f92772;
}
.software {
  color: #00e4c9;
}
.accessories {
  color: #cfc468;
}
</style>