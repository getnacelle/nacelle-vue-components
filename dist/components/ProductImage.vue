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
      :src="optimizeSource(source)"
      :alt="alt"
      :width="width"
      ref="product-image"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import VueObserveVisibility from 'vue-observe-visibility'
import optimizeImage from '../mixins/optimizeImage'
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
    },
    observeVisibility: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: false,
      offsetWidth: null
    }
  },
  computed: {
    visibility() {
      if (this.observeVisibility) {
        return this.visible
      }
      return true
    }
  },
  methods: {
    visibilityChanged(isVisible, entry) {
      this.visible = isVisible
    }
  },
  mixins: [optimizeImage]
  // mounted() {
  // let vm = this
  // this.$refs['product-image'].addEventListener('load', e => {
  //   console.log(e)
  //   vm.$emit('image-loaded')
  // })
  // }
}
</script>

<style lang="scss" scoped>
.product-image,
img {
  width: 100%;
}
</style>
