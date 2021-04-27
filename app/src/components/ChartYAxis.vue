<template>
  <g class="axis axis--y">
    <line
      class="domain"
      :y1="y.range()[0]"
      :y2="y.range()[1]"
      stroke="currentColor"
    ></line>
    <g v-for="(t, i) in ticks" 
      :key="t"
      :transform="`translate(0,${translate(t)})`"
      class="tick"
    >
      <line
        x2="-10"
        stroke="currentColor"
      ></line>
      <text
        :transform="`translate(-${tickPadding},0)`"
        dy="0.32em"
        text-anchor="end"
        fill="currentColor"
      >
        <template v-if="wrapWidth">
          <!-- Only for ordinal scale and no tick format -->
          <template v-if="wrappedTicks[i].length === 1">
            {{ t }}
          </template>
          <template v-else>
            <tspan v-for="(l, j) in wrappedTicks[i]" :key="j"
              x="0"
              :y="(j - (wrappedTicks[i].length - 1) / 2) * 16"
            >{{ l }}</tspan>
          </template>
        </template>
        <template v-else>
          {{ tickFormat(t) }}
        </template>
      </text>
    </g>
  </g>
</template>

<script>
  import { select } from "d3";
  export default {
    props: {
      y: {
        type: Function,
        required: true 
      },
      tickValues: {
        type: Array,
        default: () => []
      },
      tickFormat: {
        type: Function,
        default: d => d
      },
      tickPadding: {
        type: Number,
        default: 15
      },
      wrapWidth: {
        type: Number,
        default: 0
      }
    },
    computed: {
      ticks() {
        return this.tickValues.length
          ? this.tickValues // Custom defined tick values
          : this.y.ticks 
          ? this.y.ticks((Math.abs(this.y.range()[0] - this.y.range()[1])) / 50) // Continouous scale
          : this.y.domain() // Ordinal scale
      },
      translate() {
        return this.y.ticks
          ? t => this.y(t) // Continuous scale
          : this.y.paddingInner
          ? t => this.y(t) + this.y.bandwidth() / 2 // Band scale
          : t => this.y(t) + this.y.step() / 2 // Point scale
      },
      wrappedTicks() {
        if (!this.wrapWidth) return undefined;
        return this.ticks.map(tick => {
          const totalWidth = this.measureTextWidth(tick, "axis");
          if (totalWidth < this.wrapWidth) return [tick];
          const words = tick.split(" ");
          let line = [];
          do {
            line.push(words.shift());
          } while (this.measureTextWidth(line.join(" "), "axis") < totalWidth / 2);
          return [
            line.join(" "),
            words.join(" ")
          ]
        })
      },
    },
    methods: {
      measureTextWidth(string, className) {
        const svg = select(window.document.body).append("svg");
        const text = svg
          .append("text")
          .attr("class", className)
          .text(string);
        const bbox = text.node().getBBox();
        svg.remove();
        return bbox.width;
      }
    },
  }
</script>

<style scoped>
.axis {
  font-size: 12px;
  line-height: 28px;
}
</style>