<template>
  <div
    v-observe-visibility="{
      callback: visibilityChanged,
      once: true,
    }"
    class="product-image nacelle"
    ref="img-card"
  >
    <img v-if="visibility" :src="sourceOptimized" :alt="alt" :width="width" ref="product-image" />
  </div>
</template>

<script>
import Vue from 'vue'
import VueObserveVisibility from 'vue-observe-visibility'
Vue.use(VueObserveVisibility)

function fromShopifyCDN(url) {
  return url.split('.com')[0] === 'https://cdn.shopify'
}

function fromMagentoCDN(url) {
  // Note that not all Magento stores use images from the Magento CDN
  const [, str1, str2, str3] = url.split('://')[1].split('/')
  return str1.concat('/', str2, '/', str3) === 'media/catalog/product'
}

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
    },
    optimized: {
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
    },
    sourceOptimized() {
      if (this.optimized) {
        if (fromShopifyCDN(this.source)) {
          return this.source
            .split('&width=')[0]
            .concat(`&width=${this.offsetWidth}`)
        } else {
          return this.source
        }
      } else return this.source
    }
  },
  methods: {
    visibilityChanged(isVisible, entry) {
      this.visible = isVisible
    }
  },
  mounted() {
    if (process.client) {
      this.offsetWidth = this.$refs['img-card'].offsetWidth
    }
    // let vm = this
    // this.$refs['product-image'].addEventListener('load', e => {
    //   console.log(e)
    //   vm.$emit('image-loaded')
    // })
  }
}
</script>

<style lang="scss" scoped>
.product-image,
img {
  width: 100%;
}
</style>
