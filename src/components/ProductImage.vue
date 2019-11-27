<template>
  <div
    v-observe-visibility="{
      callback: visibilityChanged,
      once: true
    }"
    class="product-image nacelle"
    ref="img-card"
  >
    <picture>
      <source :srcset="optimizeSource({ url: source, format: 'webp' })" type="image/webp" />
      <img
        v-if="visibility"
        ref="product-image"
        :src="source"
        :alt="alt"
        :width="width"
        :style="cssVars"
      />
    </picture>
  </div>
</template>

<script>
import Vue from 'vue'
import imageOptimize from '../mixins/imageOptimize'
import imageVisibility from '../mixins/imageVisibility'

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
    },
    fadeIn: {
      type: Number,
      default: 1
    },
    containerRef: {
      type: String,
      default: 'img-card'
    }
  },
  computed: {
    cssVars() {
      return {
        '--fade-in-time': `${this.fadeIn}s`
      }
    }
  },
  mixins: [imageOptimize, imageVisibility]
}
</script>

<style lang="scss" scoped>
.product-image,
img {
  width: 100%;
  animation: fadein var(--fade-in-time);
  -moz-animation: fadein var(--fade-in-time); /* Firefox */
  -webkit-animation: fadein var(--fade-in-time); /* Safari and Chrome */
  -o-animation: fadein var(--fade-in-time); /* Opera */
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-moz-keyframes fadein {
  /* Firefox */
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes fadein {
  /* Safari and Chrome */
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-o-keyframes fadein {
  /* Opera */
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
