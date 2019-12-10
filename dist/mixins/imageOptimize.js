import { mapGetters } from 'vuex'

export default {
  props: {
    containerRef: {
      // The ref assigned to the image's containing element
      type: String,
      default: ''
    },
    resize: {
      type: Boolean,
      default: false
    },
    reformat: {
      type: Boolean,
      default: true
    },
    cropDirection: {
      type: String,
      default: 'center'
    },
    blurUp: {
      type: Boolean,
      default: false
    },
    byDominantColor: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      blurred: null,
      containerWidth: null,
      containerHeight: null,
      containerPosition: null,
      originCDN: null
    }
  },
  computed: {
    ...mapGetters('space', ['getMetafield']),
    cdn() {
      return this.getMetafield('cdn', 'provider')
    },
    cdnShopifyToCloudinary() {
      return this.originCDN === 'shopify' && this.cdn.toLowerCase() === 'cloudinary'
    },
    cloudinaryCloudName() {
      return this.getMetafield('cdn', 'cloudinary-cloud-name')
    },
    cloudinaryUrlBase() {
      return `https://res.cloudinary.com/${this.cloudinaryCloudName}/image/upload/nacelle/`
    }
  },
  methods: {
    optimizeSource({ url = null, format = 'auto' } = {}) {
      let newSource
      if (typeof url === 'string' && this.containerRef) {
        if (this.fromShopifyCDN({ url })) {
          this.originCDN = 'shopify'
          const source = (this.cdn.toLowerCase() === 'cloudinary') ? this.shopifyToCloudinary({ url }) : url
          if (this.reformat && this.cdn.toLowerCase() === 'cloudinary') {
            newSource = source.split('upload/')
              .reduce((acc, el, idx) => idx === 1 ? acc.concat(`upload/f_${format}/${el}`) : acc.concat(el))
          } else {
            newSource = source
          }
          // if (this.resize && this.reformat) {
          //   // if (newSource !== null) {
          //   newSource = this.shopifyReformat({
          //     src: this.shopifyResize({ src: source }),
          //     format
          //   })
          //   // } else {
          //   //   if (this.blurUp) {
          //   //     this.blurred = this.getBlurred({ src: source })
          //   //     newSource = this.blurred
          //   //   } else if (this.byDominantColor) {
          //   //     newSource = this.getDominantColor({ src: source })
          //   //   } else {
          //   //     newSource = ''
          //   //   }
          //   // }
          // } else if (!this.resize && this.reformat) {
          //   newSource = this.shopifyReformat({ src: source, format })
          // } else if (this.resize && !this.reformat) {
          //   // if (newSource !== null) {
          //   newSource = this.shopifyResize({ src: source })
          //   // } else if (this.blurUp) {
          //   //   this.blurred = this.getBlurred({ src: source })
          //   //   newSource = this.blurred
          //   // } else if (this.byDominantColor) {
          //   //   newSource = this.getDominantColor({ src: source })
          //   // } else {
          //   //   newSource = ''
          //   // }
          // } else {
          //   newSource = source
          // }
        } else newSource = url
        return newSource
      }
      return url
    },
    calculateContainer() {
      if ((process.client || process.browser) && this.containerRef) {
        this.containerHeight = this.$refs[this.containerRef].clientHeight
        this.containerWidth = this.$refs[this.containerRef].clientWidth
        this.containerPosition = window.getComputedStyle(
          this.$refs[this.containerRef]
        ).position
      }
    },
    getBlurred({ src = null } = {}) {
      return this.shopifyResize({
        src,
        width: 20,
        height: ''
      })
    },
    getDominantColor({ src = null } = {}) {
      return this.shopifyResize({
        src,
        width: 1,
        height: ''
      })
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
      // NOTE: Transformation only works on png and jpg images.
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
    shopifyToCloudinary({ url }) {
      return typeof (url) === 'string'
        ? `${this.cloudinaryUrlBase}${url.split('https://cdn.shopify.com/s/files/')[1].split('&')[0]}`
        : url
    },
    fromCloudinaryCDN({ url = null } = {}) {
      if (typeof url === 'string') {
        return url.split('.com')[0] === 'https://res.cloudinary'
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
    }
  },
  mounted() {
    this.calculateContainer()
  },
  updated() {
    this.calculateContainer()
  }
}
