<template>
  <div
    :style="orbiteStyles"
    class="orbite">
    <div :style="sunStyles" class="sun" />
  </div>
</template>

<script>
export default {
  props: {
    percentOfDaytimeLeft: Number,
    borderWidth: {
      type: Number,
      default: 2
    }
  },
  mounted () {
    const width = this.getWidth()
    const { orbiteStyles, sunStyles } = this.computeStyles(width)
    this.orbiteStyles = orbiteStyles
    this.sunStyles = sunStyles
  },
  data () {
    return {
      orbiteStyles: null,
      sunStyles: null
    }
  },
  methods: {
    getWidth () {
      return this.$el.parentElement.clientWidth
    },
    computeStyles (width) {
      const cx = width / 2
      const cy = 0
      const angle = Math.PI * this.percentOfDaytimeLeft
      const x = cx + cx * Math.cos(angle)
      const y = cy + cx * Math.sin(angle)
      return {
        orbiteStyles: {
          width: width + 'px',
          height: (cx) + 'px',
          borderWidth: this.borderWidth + 'px',
          borderTopLeftRadius: (cx + this.borderWidth) + 'px',
          borderTopRightRadius: (cx + this.borderWidth) + 'px'
        },
        sunStyles: {
          left: x + 'px',
          bottom: y + 'px'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .orbite {
      border-style: dashed;
      border-color: grey;
      border-bottom: 0;
      position: relative;
  }

  .sun {
    position: absolute;
    width: 1em;
    height: 1em;
    bottom: 0;
    left: 0;
    transform: translate(-50%, 50%);
    background-color: $primary;
    border-radius: 10000000px;
    transition: all .2s ease-in-out;
  }
</style>
