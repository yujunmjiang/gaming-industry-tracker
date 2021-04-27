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
import { nextTick } from 'vue'
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
  data() {
    return {
      padding: 8,
      translateX: -999,
      translateY: -999
    }
  },
  watch: {
    x() {
      this.getTranslation();
    },
    y() {
      this.getTranslation();
    }
  },
  methods: {
    async getTranslation() {
      if (!this.$el) {
        this.translateX = this.x;
        this.translateY = this.y;
      } else {
        await nextTick();
        const width = this.$el.clientWidth;
        this.translateX = this.x + this.padding;
        if (this.translateX + width > this.boundsWidth - this.padding) {
          this.translateX = this.x - this.padding - width;
        }
        if (this.translateX < this.padding) {
          this.translateX = this.padding;
        }
        this.translateY = this.y - this.$el.clientHeight - this.padding;
        if (this.translateY < 0) {
          this.translateY = this.y + this.padding;
        }
      }
    }
  },
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

<style>
.chart-tooltip .tooltip-item + .tooltip-item {
  margin-top: 1em;
}
.chart-tooltip .tooltip-title {
  color: #A5A5A5;
}
.chart-tooltip .tooltip-name {
  text-transform: capitalize;
}

.chart-tooltip table {
  border-collapse: collapse;
}

.chart-tooltip td {
  padding-top: 1rem;
}

.chart-tooltip td + td {
  padding-left: 1rem;
}

.chart-tooltip .tooltip-swatch {
  display: block;
  width: 1em;
  height: 1em;
}
</style>