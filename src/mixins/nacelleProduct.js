import { mapMutations, mapGetters } from 'vuex'
import productMetafields from './productMetafields'
import { getProduct } from '@nacelle/nacelle-tools'

export default params => {
  return {
    mixins: [getProduct(params), productMetafields],
    computed: {
      ...mapGetters('space', ['getMetatag'])
    },
    methods: {
      ...mapMutations('cart', ['showCart'])
    },
    head() {
      if (this.product) {
        const properties = {}
        const meta = []
        const title = this.getMetatag('title')

        if (this.product.title) {
          let fullTitle = this.product.title

          if (title) {
            fullTitle = `${fullTitle} | ${title.value}`
          }

          properties.title = fullTitle
          meta.push({
            hid: 'og:title',
            property: 'og:title',
            content: fullTitle
          })
        }

        if (this.product.description) {
          meta.push({
            hid: 'description',
            name: 'description',
            content: this.product.description
          })
          meta.push({
            hid: 'og:description',
            property: 'og:description',
            content: this.product.description
          })
        }

        if (this.product.featuredMedia) {
          meta.push({
            hid: 'og:image',
            property: 'og:image',
            content: this.product.featuredMedia.src
          })
        }

        return {
          ...properties,
          meta
        }
      }
    }
  }
}
