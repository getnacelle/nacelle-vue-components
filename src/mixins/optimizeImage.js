export default {
  props: {
    resize: {
      type: Boolean,
      default: true,
    },
    reformat: {
      type: Boolean,
      default: true,
    },
    format: {
      type: String,
      default: 'webp',
    },
    blurUp: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      containerWidth: null,
      containerPosition: null,
      container: null,
      emptySvg:
        "data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E",
    }
  },
  methods: {
    optimizeSource({ url, containerRef } = {}) {
      // The 'containerRef' named parameter is a ref which
      // must be assigned to the image's containing element
      this.container = containerRef
      if (this.fromShopifyCDN(url)) {
        if (this.resize && this.reformat) {
          if (this.containerWidth !== null) {
            return this.shopifyReformat({
              src: this.shopifyResize({ src: url }),
            })
          } else {
            if (this.blurUp) {
              return this.shopifyResize({ src: url, width: 20 })
            } else {
              return this.emptySvg
            }
          }
        } else if (this.resize && !this.reformat) {
          if (this.containerWidth !== null) {
            return this.shopifyResize({ src: url })
          } else if (this.blurUp) {
            return this.shopifyResize({ src: url, width: 20 })
          } else {
            return this.emptySvg
          }
        } else if (!this.resize && this.reformat) {
          return this.shopifyReformat({ src: url })
        } else {
          return url
        }
      } else return url
    },
    calculateContainer() {
      if (process.client && this.container !== null) {
        this.containerWidth = this.$refs[this.container].offsetWidth
        this.containerPosition = window.getComputedStyle(
          this.$refs[this.container]
        ).position
      }
    },
    shopifyResize({ src, width = 'auto' } = {}) {
      // Request size which closely matches the width of the bounding element,
      // unless the parent container uses absolute positioning.
      // Round up size to the nearest 50px increment.
      if (width === 'auto' && this.containerPosition !== 'absolute') {
        const roundedUpToNearest50px = x => +x + 49 - ((+x + 49) % 50)
        return width !== null
          ? src
              .split('&width=')[0]
              .concat(`&width=${roundedUpToNearest50px(this.containerWidth)}`)
          : src
      } else if (width !== 'auto') {
        return src.split('&width=')[0].concat(`&width=${width}`)
      } else {
        return src
      }
    },
    shopifyReformat({ src, format = 'webp' } = {}) {
      // Takes either a png or jpg (other formats will not work),
      // Returns query string for image in WebP or PJPG format.
      // NOTE 1: Transformation only works on png and jpg images.
      // NOTE 2: This function defaults to webp (preferred by Lighthouse)
      //
      // Example 1:
      //  shopifyReformat({ src = "https://cdn.shopify.com/s/files/myPicture.png", format = 'pjpg'})
      //  returns: "https://cdn.shopify.com/s/files/myPicture.png&format=pjpg"
      // Example 2:
      //  shopifyReformat({ src = "https://cdn.shopify.com/s/files/myPicture.jpg", format = 'webp'})
      //  returns: "https://cdn.shopify.com/s/files/myPicture.jpg&format=webp"
      //
      const extension = Array.from(src.split('?v=')[0].split('.')).pop()
      if (extension === 'png' || extension === 'jpg') {
        return src.split('&format=')[0].concat(`&format=${format}`)
      } else {
        // return the original image if it is a gif / not a png or jpg
        return src
      }
    },
    fromShopifyCDN(url) {
      return url.split('.com')[0] === 'https://cdn.shopify'
    },
    fromMagentoCDN(url) {
      // Note that not all Magento stores use images from the Magento CDN
      const [, str1, str2, str3] = url.split('://')[1].split('/')
      return str1.concat('/', str2, '/', str3) === 'media/catalog/product'
    },
  },
  mounted() {
    this.calculateContainer()
  },
  updated() {
    this.calculateContainer()
  },
}
