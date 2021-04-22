<template>
<div 
  class="chart-tooltip"
  :class="{ show }"
  :style="{ transform: `translate(${translateX}px,${translateY}px)` }"
>
  <slot />
</div>
</template>

<script>
export default {
  props: {
    boundsWidth: {
      type: Number,
      required: true 
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    translateY() {
      if (!this.$el) return this.y;
      let translateY = this.y - this.$el.clientHeight - 8;
      if (translateY < 0) {
        translateY = this.y + 8;
      }
      return translateY;
    },
    translateX() {
      if (!this.$el) return this.x;
      const width = this.$el.clientWidth;
      let translateX = this.x + 8;
      if (translateX + width > this.boundsWidth) {
        translateX = this.x - 8 - width;
      }
      if (translateX < 0) {
        translateX = 0;
      }
      return translateX;
    }
  }
}
</script>

<style scoped>
.chart-tooltip {
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  text-align: initial;
  font-size: 12px;
  line-height: 1.2;
  padding: 0.75rem 1rem;
  max-width: 100%;
  background: #FBFBFB;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  opacity: 0;
  transition: opacity 0.15s ease-in-out;
}

.chart-tooltip.show {
  opacity: 1;
}
</style>