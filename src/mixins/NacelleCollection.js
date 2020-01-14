import { mapGetters } from 'vuex'
import { getCollection } from '@nacelle/nacelle-tools'

export default params => {
  return {
    name: 'collection',
    mixins: [getCollection(params)],
    computed: {
      ...mapGetters('space', ['getMetatag']),
      featuredImage() {
        if (
          this.collection &&
        this.collection.featuredMedia &&
        this.collection.featuredMedia.src
        ) {
          return this.collection.featuredMedia.src
        }

        return null
      }
    },
    head() {
      if (this.collection) {
        const properties = {}
        const meta = []
        const title = this.getMetatag('title')

        if (this.collection.title) {
          let fullTitle = this.collection.title

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

        if (this.collection.description) {
          meta.push({
            hid: 'description',
            name: 'description',
            content: this.collection.description
          })
          meta.push({
            hid: 'og:description',
            property: 'og:description',
            content: this.collection.description
          })
        }

        if (this.featuredImage) {
          meta.push({
            hid: 'og:image',
            property: 'og:image',
            content: this.featuredImage
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
