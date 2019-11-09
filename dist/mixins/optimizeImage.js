function fromShopifyCDN(url) {
  return url.split('.com')[0] === 'https://cdn.shopify'
}

function fromMagentoCDN(url) {
  // Note that not all Magento stores use images from the Magento CDN
  const [, str1, str2, str3] = url.split('://')[1].split('/')
  return str1.concat('/', str2, '/', str3) === 'media/catalog/product'
}

// OPTIMIZATIONS SPECIFIC TO IMAGES FROM THE SHOPIFY CDN
//
// For more information, see: 
//  https://help.shopify.com/en/themes/liquid/filters/url-filters#img_url

function shopifyOptimizeSize({ src, containerWidth } = {}) {
  // Request size which matches the width of the bounding element
  return containerWidth !== null ? src.split('&width=')[0].concat(`&width=${containerWidth}`) : src
}

function shopifyOptimizeFormat(src) {
  // Request image in "progressive JPEG" (pjpg) format
  // NOTE: Transformation to pjpg only works on png and jpg images,
  // so return the original image if it is a gif / other.
  const extension = Array.from(src.split('?v=')[0].split('.')).pop()
  if (extension === 'png' || extension === 'jpg') {
    return src.split('&format=')[0].concat('&format=pjpg')
  } else {
    return src
  }
}

export default {
  props: {
    optimizedSize: {
      type: Boolean,
      default: true
    },
    optimizedFormat: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      containerWidth: null,
      container: null
    }
  },
  methods: {
    optimizeSource({url, containerRef} = {}) {
      // The 'containerRef' named parameter is a ref which
      // must be assigned to the image's containing element
      this.container = containerRef
      if (fromShopifyCDN(url)) {
        if (this.optimizedSize && this.optimizedFormat) {
          if (this.containerWidth !== null) {
            return shopifyOptimizeFormat(shopifyOptimizeSize({src: url, containerWidth: this.containerWidth}))
          } else {
            return 'data:,' // effectively an empty 'src' string
          }
        } else if (this.optimizedSize && !this.optimizedFormat) {
          if (this.containerWidth !== null) {
            return shopifyOptimizeSize({src: url, containerWidth: this.containerWidth})
          } else {
            return 'data:,' // effectively an empty 'src' string
          }
        } else if (!this.optimizedSize && this.optimizedFormat) {
          return shopifyOptimizeFormat(url)
        } else {
          return url
        }
      } else return url
    }
  },
  created() {
    if (process.client && (this.container !== null)) {
      this.containerWidth = this.$refs[this.container].offsetWidth
    }
  }
}