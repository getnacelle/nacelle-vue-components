import { mapGetters, mapMutations, mapActions } from 'vuex'
import localforage from 'localforage'

export default params => {
  return {
    methods: {
      ...mapMutations('cart', ['hideCart', 'setFreeShippingThreshold']),
      ...mapActions('cart', ['updateLocalCart']),
      ...mapActions('user', ['readSession'])
    },
    data() {
      return {
        headerHeight: null
      }
    },
    computed: {
      ...mapGetters('space', ['getMetatag'])
    },
    created() {
      this.$nacelle.setSpace()
    },
    mounted() {
      if (this.$refs.header) {
        this.headerHeight = this.$refs.header.$el.clientHeight
      }

      this.updateLocalCart()
      this.setFreeShippingThreshold(100)

      this.hideCart()

      if (process.env.DEV_MODE === 'true') {
        console.log('dev mode active!')
        localforage.clear()
      }
      this.readSession()
    },
    head() {
      const properties = {}
      const meta = []
      const title = this.getMetatag('title')
      const description = this.getMetatag('description')
      const image = this.getMetatag('og:image')

      if (title) {
        properties.title = title.value
        meta.push({
          hid: 'og:title',
          property: 'og:title',
          content: title.value
        })
        meta.push({
          hid: 'og:site_name',
          property: 'og:site_name',
          content: title.value
        })
      }

      if (description) {
        meta.push({
          hid: 'description',
          name: 'description',
          content: description.value
        })
        meta.push({
          hid: 'og:description',
          property: 'og:description',
          content: description.value
        })
      }

      if (image) {
        meta.push({
          hid: 'og:image',
          property: 'og:image',
          content: image.value
        })
      }

      meta.push({
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      })

      return {
        ...properties,
        meta
      }
    }
  }
}
