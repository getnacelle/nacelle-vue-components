function fromShopifyCDN(url) {
  return url.split('.com')[0] === 'https://cdn.shopify'
}

function fromMagentoCDN(url) {
  // Note that not all Magento stores use images from the Magento CDN
  const [, str1, str2, str3] = url.split('://')[1].split('/')
  return str1.concat('/', str2, '/', str3) === 'media/catalog/product'
}

function shopifyOptimizeSize({ src, containerWidth, containerPosition } = {}) {
  // Request size which matches the width of the bounding element,
  // unless the parent container uses absolute positioning
  if (containerPosition !== "absolute") {
    return containerWidth !== null ? src.split('&width=')[0].concat(`&width=${containerWidth}`) : src
  } else {
    return src
  }
}

function shopifyOptimizeFormat(src) {
  // Request image in "progressive JPEG" (pjpg) format
  // NOTE: Transformation to pjpg only works on png and jpg images,
  // so return the original image if it is a gif / other.
  //
  // For more information, see: 
  //  https://help.shopify.com/en/themes/liquid/filters/url-filters#img_url
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
      containerPosition: null,
      container: null,
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
            return shopifyOptimizeFormat(shopifyOptimizeSize({src: url, containerWidth: this.containerWidth, containerPosition: this.containerPosition}))
          } else {
            return "data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E" // empty svg
          }
        } else if (this.optimizedSize && !this.optimizedFormat) {
          if (this.containerWidth !== null) {
            return shopifyOptimizeSize({src: url, containerWidth: this.containerWidth, containerPosition: this.containerPosition})
          } else {
            return "data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E" // empty svg
          }
        } else if (!this.optimizedSize && this.optimizedFormat) {
          return shopifyOptimizeFormat(url)
        } else {
          return url
        }
      } else return url
    },
    calculateContainer() {
      if (process.client && (this.container !== null)) {
        this.containerWidth = this.$refs[this.container].offsetWidth
        this.containerPosition = window.getComputedStyle(this.$refs[this.container]).position
      }
    }
  },
  mounted() {
    this.calculateContainer()
  },
  updated() {
    this.calculateContainer()
  }
}