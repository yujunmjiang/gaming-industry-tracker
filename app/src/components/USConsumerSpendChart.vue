<template>
<div>
  <ChartTitle>Consumer spending on gaming in the United States in 2nd quarter 2019 and 2nd quarter 2020</ChartTitle>
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
      />
      <g>
        <g 
          v-for="([g, gs], i) in stacks" 
          :key="g"
          :transform="`translate(${x(g)},0)`"
          class="hoverable"
          @mouseenter="entered(i)"
          @mouseleave="left"
          >
            <rect
              v-for="s in gs"
              :key="s.key"
              :class="s.key"
              :width="x.bandwidth()"
              :y="y(s[0][1])"
              :height="y(s[0][0])- y(s[0][1])"
              fill="currentColor"
            ></rect>
            <text
              v-for="s in gs"
              :key="s.key"
              class="value-label"
              :x="x.bandwidth() / 2"
              :y="(y(s[0][0]) + y(s[0][1])) / 2"
              dy="0.32em"
              text-anchor="middle"
              fill="currentColor"
            >{{ s[0].data[s.key] }}</text>
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
        <div class="tooltip-item tooltip-title">{{ tooltipData[0] }}</div>
        <div v-for="d in tooltipData[1]" :key="d.key" class="tooltip-item">
          <div :class="d.key" class="tooltip-name">{{ d.key }}</div>
          <div>{{ formatValue(d[0].data[d.key]) }}</div>
        </div>
      </div>
    </ChartTooltip>
  </div>
</div>
</template>

<script>
import { json, max, scaleBand, scaleLinear, stack, stackOrderNone, stackOffsetNone} from "d3";
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
      stacks: [],
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
    y() {
      return scaleLinear()
        .domain([0, this.maxValue])
        .range([this.height - this.margin.bottom, this.margin.top])
        .nice();
    },
    formatValue() {
      return v => `$ ${v}B`;
    },
    tooltipX() {
      return this.tooltipData !== null 
        ? this.x(this.tooltipData[0]) + this.x.bandwidth() 
        : -999;
    },
    tooltipY() {
      return this.tooltipData !== null 
        ? this.y(this.tooltipData[1][this.tooltipData[1].length - 1][0][1])
        : -999;
    }
  },
  created() {
    json('usvideogame_consumerspend.json')
    .then(data => {
      this.groups = data.map(d => d.time);
      this.series = ["content", "hardware", "accessories"];
      const stackGenerator = stack()
        .keys(this.series)
        .order(stackOrderNone)
        .offset(stackOffsetNone);
      this.stacks = data.map(d => [
        d.time,
        stackGenerator([d])
      ]);
      this.maxValue = max(this.stacks, d => max(d[1], e => e[e.length - 1][1]));
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
      this.tooltipData = this.stacks[i];
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
.value-label {
  color: #fff;
}
.content {
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
</style>