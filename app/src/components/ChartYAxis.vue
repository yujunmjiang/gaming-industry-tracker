<template>
  <g class="axis">
    <line
      :y1="y.range()[0]"
      :y2="y.range()[1]"
      stroke="currentColor"
    ></line>
    <g v-for="t in ticks" 
      :key="t"
      :transform="`translate(0,${translate(t)})`"
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
        {{ tickFormat(t) }}
      </text>
    </g>
  </g>
</template>

<script>
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
      }
    },
    computed: {
      ticks() {
        return this.tickValues.length
          ? this.tickValues // Custom defined tick values
          : this.y.ticks 
          ? this.y.ticks((Math.abs(this.y.range()[0] - this.y.range()[1])) / 40) // Continouous scale
          : this.y.domain() // Ordinal scale
      },
      translate() {
        return this.y.ticks
          ? t => this.y(t) // Continuous scale
          : this.y.paddingInner
          ? t => this.y(t) + this.y.bandwidth() / 2 // Band scale
          : t => this.y(t) + this.y.step() / 2 // Point scale
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