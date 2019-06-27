<template>
  <div v-observe-visibility="visibilityChanged">
    <img v-if="visible" :src="source" :alt="alt" :width="width">
  </div>
</template>

<script>
import Vue from 'vue'
import VueObserveVisibility from 'vue-observe-visibility'
Vue.use(VueObserveVisibility)

export default {
  props: {
    source: {
      type: String,
      default:
        'https://nacelle-assets.s3-us-west-2.amazonaws.com/default-product-image.svg'
    },
    alt: {
      type: String,
      default: 'Featured Product Image'
    },
    width: {
      type: Number
    }
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    visibilityChanged(isVisible, entry) {
      this.visible = isVisible
    }
  }
}
</script>

<style lang="scss" scoped>
div,
img {
  width: 100%;
}
</style>
