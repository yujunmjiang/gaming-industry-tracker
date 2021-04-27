<template>
<div>
  <ChartTitle>Share of new mobile gamers in selected countries who are open to gaming as a social activity as of July 2020</ChartTitle>
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
              :y="y(records[i][s])"
              :height="y.range()[0] - y(records[i][s])"
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
        <div class="tooltip-item tooltip-title">{{ tooltipData.country }}</div>
        <div>
          <table>
            <tr v-for="s in series" :key="s" class="tooltip-item">
              <td>
                <div :class="s" class="tooltip-swatch"></div>
              </td>
              <td class="tooltip-name">{{ seriesFullName(s) }}</td>
              <td>{{ formatValue(tooltipData[s]) }}</td>
            </tr>
          </table>
        </div>
      </div>
    </ChartTooltip>
  </div>
</div>
</template>

<script>
import { json, max, scaleBand, scaleLinear } from "d3";
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
        .domain([0, this.maxValue])
        .range([this.height - this.margin.bottom, this.margin.top])
        .nice();
    },
    formatValue() {
      return v => `${v}%`;
    },
    tooltipX() {
      return this.tooltipData !== null 
        ? this.x(this.tooltipData.country) + this.x.bandwidth() 
        : -999;
    }
  },
  created() {
    json('world_socialact.json')
    .then(data => {
      this.groups = data.map(d => d.country);
      this.series = ["type1", "type2", "type3"];
      this.records = data;
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
    },
    seriesFullName(s) {
      return {
        type1: "I prefer playing multiplayer/online modes to single player",
        type2: "I prefer being part of a team when playing against others",
        type3: "I prefer chatting with others when playing games"
      }[s];
    }
  }
}
</script>

<style scoped>
.chart-body {
  position: relative;
}
.type1 {
  color: #9146FF;
  background-color: #9146FF;
}
.type2 {
  color: #F92772;
  background-color: #F92772;
}
.type3 {
  color: #C1B761;
  background-color: #C1B761;
}
.hoverable:hover {
  filter: brightness(125%);
}
</style>