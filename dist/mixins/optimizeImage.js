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

function shopifyOptimizeSize({ src, offsetWidth } = {}) {
  // Request size which matches the width of the bounding element
  return src.split('&width=')[0].concat(`&width=${offsetWidth}`)
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
      offsetWidth: null
    }
  },
  methods: {
    optimizeSource({url, containerRef} = {}) {
      // The 'containerRef' named parameter is a ref which
      // must be assigned to the image's containing element
      if (fromShopifyCDN(url)) {
        if (this.optimizedSize && this.optimizedFormat) {
          return shopifyOptimizeFormat(
            shopifyOptimizeSize({
              src: url,
              offsetWidth: this.offsetWidth
            })
          )
        } else if (this.optimizedSize && !this.optimizedFormat) {
          return shopifyOptimizeSize({
            src: url,
            offsetWidth: this.offsetWidth
          })
        } else if (!this.optimizedSize && this.optimizedFormat) {
          return shopifyOptimizeFormat(url)
        } else {
          return url
        }
      } else return url
    }
  },
  mounted() {
    if (process.client) {
      this.offsetWidth = this.$refs['img-card'].offsetWidth
    }
  }
}