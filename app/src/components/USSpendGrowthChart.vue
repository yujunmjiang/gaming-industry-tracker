<template>
<div>
  <ChartTitle>Growth of consumer spending on video games in the United States from March to August 2020</ChartTitle>
  <div class="chart-body" ref="container">
    <svg
      :viewBox="`0 0 ${width} ${height}`"
      ref="svg"
    >
      <ChartXAxis
        :x="x"
        :tick-values="groups"
        :transform="`translate(0,${height - margin.bottom})`"
      />
      <ChartYAxis
        :y="y"
        :transform="`translate(${margin.left},0)`"
        :tickFormat="formatValue"
      />
      <line
        :x1="x.range()[0]"
        :x2="x.range()[1]"
        :y1="y(0)"
        :y2="y(0)"
        stroke="currentColor"
      ></line>
      <g>
        <g 
          v-for="(g, i) in groups" 
          :key="g"
          :transform="`translate(${x(g)},0)`"
          class="hoverable"
          @mouseenter="entered(i)"
          @mouseleave="left"
          >
            <rect
              v-for="s in series"
              :key="s"
              :class="s"
              :x="xInner(s)"
              :width="xInner.bandwidth()"
              :y="Math.min(y(0), y(records[i][s]))"
              :height="Math.abs(y(0) - y(records[i][s]))"
              fill="currentColor"
            ></rect>
        </g>
      </g>
    </svg>
    <ChartTooltip
      :bounds-width="width"
      :x="tooltipX"
      :y="tooltipY"
      :show="tooltipShow"
    >
      <div v-if="tooltipData">
        <div class="tooltip-item tooltip-title">{{ tooltipData.date }}</div>
        <div v-for="s in series" :key="s" class="tooltip-item">
          <div :class="s" class="tooltip-name">{{ s }}</div>
          <div>{{ formatValue(tooltipData[s]) }}</div>
        </div>
      </div>
    </ChartTooltip>
  </div>
</div>
</template>

<script>
import { json, min, max, scaleBand, scaleLinear } from "d3";
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
      groups: [],
      series: [],
      records: [],
      minValue: 0,
      maxValue: 0,
      width: 300,
      height: 400,
      margin: {
        top: 10,
        right: 5,
        bottom: 120,
        left: 48
      },
      tooltipData: null,
      tooltipY: 100,
      tooltipShow: false
    }
  },
  computed: {
    x() {
      return scaleBand()
        .domain(this.groups)
        .range([this.margin.left, this.width - this.margin.right])
        .padding(0.4);
    },
    xInner() {
      return scaleBand()
        .domain(this.series)
        .range([0, this.x.bandwidth()])
        .padding(0.1);
    },
    y() {
      return scaleLinear()
        .domain([this.minValue, this.maxValue])
        .range([this.height - this.margin.bottom, this.margin.top])
        .nice();
    },
    formatValue() {
      return v => `${v}%`;
    },
    tooltipX() {
      return this.tooltipData !== null 
        ? this.x(this.tooltipData.date) + this.x.bandwidth() 
        : -999;
    }
  },
  created() {
    json('usvideogame_spendgrowth.json')
    .then(data => {
      this.groups = data.map(d => d.date);
      this.series = ["games", "hardware", "accessories"];
      this.records = data;
      this.minValue = min(data, d => min(this.series, s => d[s]));
      this.maxValue = max(data, d => max(this.series, s => d[s]));
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
.games {
  color: #9146FF;
}
.hardware {
  color: #F92772;
}
.accessories {
  color: #C1B761;
}
.hoverable:hover {
  filter: brightness(125%);
}
::v-deep .axis--x .domain,
::v-deep .axis--x .tick line {
  display: none;
}
</style>