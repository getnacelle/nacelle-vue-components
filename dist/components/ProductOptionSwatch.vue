<template>
  <div class="no-select" :class="swatchStyle" @click="emitValue">
    <div class="inside-color" v-if="swatchStyle == 'bubble'" :style="{backgroundColor: value}"></div>
    <span v-if="swatchStyle != 'bubble'">{{value}}</span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String
    },
    swatchStyle: {
      type: String
    },
    selected: {
      type: Boolean
    }
  },
  methods: {
    emitValue() {
      this.$emit('swatchValue', this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.bubble,
.tab {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 1rem;
  &:first-child {
    margin-left: unset;
  }
  margin-bottom: 1rem;
}

.bubble {
  width: 2rem;
  height: 2rem;
  border: 1px solid #cecece;
  border-radius: 2rem;
  .inside-color {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1.5rem;
  }
}
.bubble.selected {
  transition: border 0.1s ease;
  border: 2px solid #a9a8a8;
}
.tab {
  transition: background 0.2s ease;
  border: 1px solid #a9a8a8;
  border-radius: 2px;
  height: 2rem;
  width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 9pt;
  text-transform: uppercase;
}
.tab.selected {
  background: #a9a8a8;
  color: white;
  font-weight: bold;
}
</style>
