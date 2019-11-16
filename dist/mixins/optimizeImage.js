import { ObserveVisibility } from 'vue-observe-visibility'

export default {
  directives: {
    ObserveVisibility,
  },
  props: {
    observeVisibility: {
      type: Boolean,
      default: true,
    },
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
    cropDirection: {
      type: String,
      default: 'center',
    },
    blurUp: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      visible: false,
      container: null,
      blurred: null,
      containerWidth: null,
      containerHeight: null,
      containerPosition: null,
      newUrl: null,
      emptySvg:
        "data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E",
    }
  },
  computed: {
    visibility() {
      if (this.observeVisibility) {
        return this.visible
      }
      return true
    },
  },
  methods: {
    visibilityChanged(isVisible) {
      this.visible = isVisible
    },
    optimizeSource({ url = null, containerRef = null } = {}) {
      // The 'containerRef' named parameter is a ref which
      // must be assigned to the image's containing element
      if (typeof url === 'string' && containerRef !== null) {
        this.container = containerRef
        if (this.fromShopifyCDN({ url })) {
          if (this.resize && this.reformat) {
            if (this.newUrl !== null) {
              this.newUrl = this.shopifyReformat({
                src: this.shopifyResize({ src: url }),
              })
            } else {
              if (this.blurUp) {
                this.blurred = this.shopifyResize({
                  src: url,
                  width: 20,
                  height: '',
                })
                this.newUrl = this.blurred
              } else {
                this.newUrl = this.emptySvg
              }
            }
          } else if (this.resize && !this.reformat) {
            if (this.newUrl !== null) {
              this.newUrl = this.shopifyResize({ src: url })
            } else if (this.blurUp) {
              this.blurred = this.shopifyResize({
                src: url,
                width: 20,
                height: '',
              })
              this.newUrl = this.blurred
            } else {
              this.newUrl = this.emptySvg
            }
          } else if (!this.resize && this.reformat) {
            this.newUrl = this.shopifyReformat({ src: url })
          } else {
            this.newUrl = url
          }
        } else this.newUrl = url
        return this.newUrl
      }
      return url
    },
    calculateContainer() {
      if (process.client && this.container !== null) {
        this.containerHeight = this.$refs[this.container].clientHeight
        this.containerWidth = this.$refs[this.container].clientWidth
        this.containerPosition = window.getComputedStyle(
          this.$refs[this.container]
        ).position
      }
    },
    shopifyResize({ src = null, width = 'auto', height = 'auto' } = {}) {
      // Request size which closely matches the width of the bounding element,
      // unless the parent container uses absolute positioning.
      // Round up size to the nearest 50px increment.
      function roundedUpToNearest50px(x) {
        // Return a blank string if less than 50px
        if (x >= 50) {
          return +x + 49 - ((+x + 49) % 50)
        }
        return ''
      }
      if (typeof src === 'string') {
        const [baseWithExt, args] = src.split('?')
        const [extension] = Array.from(baseWithExt.split('.')).reverse()
        const [base] = baseWithExt.split(`.${extension}`)
        const newWidth =
          width === 'auto' ? roundedUpToNearest50px(this.containerWidth) : width
        const newHeight =
          height === 'auto'
            ? roundedUpToNearest50px(this.containerHeight)
            : height
        const newSizeString =
          newWidth !== '' || newHeight !== '' ? `_${newWidth}x${newHeight}` : ''
        const cropString =
          this.containerPosition === 'absolute'
            ? `_crop_${this.cropDirection}`
            : ''
        const newBase = base.concat(newSizeString, cropString)
        const newArgs = args
          ? args.split('&').filter(el => el.includes('width=') === false)
          : null
        const newSrc = newBase.concat(`.${extension}?${newArgs}`)
        return newSrc
      }
      return null
    },
    shopifyReformat({ src = null, format = 'webp' } = {}) {
      // Takes either a png or jpg (other formats will not work),
      // Returns query string for image in WebP or PJPG format.
      // NOTE 1: Transformation only works on png and jpg images.
      // NOTE 2: This function defaults to webp (preferred by Lighthouse)
      //
      // Example 1:
      //  shopifyReformat({ src: "https://cdn.shopify.com/s/files/myPicture.png", format: 'pjpg'})
      //  returns: "https://cdn.shopify.com/s/files/myPicture.png&format=pjpg"
      // Example 2:
      //  shopifyReformat({ src: "https://cdn.shopify.com/s/files/myPicture.jpg", format: 'webp'})
      //  returns: "https://cdn.shopify.com/s/files/myPicture.jpg&format=webp"
      //
      if (typeof src === 'string') {
        const extension = Array.from(src.split('?v=')[0].split('.')).pop()
        if (extension === 'png' || extension === 'jpg') {
          return src.split('&format=')[0].concat(`&format=${format}`)
        } else {
          // return the original image if it is a gif / not a png or jpg
          return src
        }
      } else {
        return null
      }
    },
    fromShopifyCDN({ url = null } = {}) {
      if (typeof url === 'string') {
        return url.split('.com')[0] === 'https://cdn.shopify'
      }
      return false
    },
    fromMagentoCDN({ url = null } = {}) {
      // Note that not all Magento stores use images from the Magento CDN
      if (typeof url === 'string') {
        const [, str1, str2, str3] = url.split('://')[1].split('/')
        return str1.concat('/', str2, '/', str3) === 'media/catalog/product'
      }
      return false
    },
  },
  mounted() {
    this.calculateContainer()
  },
  updated() {
    this.calculateContainer()
  },
}
