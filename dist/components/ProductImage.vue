<template>
  <div
    v-observe-visibility="{
      callback: visibilityChanged,
      once: true,
    }"
    class="product-image nacelle"
    ref="img-card"
  >
    <img
      v-if="visibility"
      :src="optimizeSource({url: source, containerRef: 'img-card'})"
      :alt="alt"
      :width="width"
      ref="product-image"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import optimizeImage from '../mixins/optimizeImage'

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
  mixins: [optimizeImage]
}
</script>

<style lang="scss" scoped>
.product-image,
img {
  width: 100%;
}
</style>
