<template>
  <g class="axis axis--x">
    <path
      class="domain"
      :d="`M${x.range()[0]},10V0H${x.range()[1]}V10`"
      fill="none"
      stroke="currentColor"
    ></path>
    <g v-for="t in ticks" 
      :key="t"
      :transform="`translate(${translate(t)},0)`"
      class="tick"
    >
      <line
        y2="10"
        stroke="currentColor"
      ></line>
      <text
        transform="translate(0,15)rotate(-60)"
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
      x: {
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
      }
    },
    computed: {
      ticks() {
        return this.tickValues.length
          ? this.tickValues // Custom defined tick values
          : this.x.ticks 
          ? this.x.ticks((this.x.range()[1] - this.x.range()[2]) / 80) // Continouous scale
          : this.x.domain() // Ordinal scale
      },
      translate() {
        return this.x.ticks
          ? t => this.x(t) // Continuous scale
          : this.x.paddingInner
          ? t => this.x(t) + this.x.bandwidth() / 2 // Band scale
          : t => this.x(t) + this.x.step() / 2 // Point scale
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