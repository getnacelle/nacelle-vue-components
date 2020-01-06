import { mapGetters } from 'vuex'
import { getBlogArticle, getCollection } from '@nacelle/nacelle-tools'

export default params => {
  return {
    mixins: [getCollection(params), getBlogArticle(params)],
    computed: {
      ...mapGetters('space', ['getMetatag'])
    },
    head() {
      if (this.article) {
        const properties = {}
        const meta = []
        const title = this.getMetatag('title')

        if (this.article.title) {
          let fullTitle = this.article.title

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

        if (this.article.description) {
          meta.push({
            hid: 'description',
            name: 'description',
            content: this.article.description
          })
          meta.push({
            hid: 'og:description',
            property: 'og:description',
            content: this.article.description
          })
        }

        if (this.article.featuredMedia) {
          meta.push({
            hid: 'og:image',
            property: 'og:image',
            content: this.article.featuredMedia.src
          })
        }

        meta.push({
          hid: 'og:type',
          property: 'og:type',
          content: 'article'
        })

        return {
          ...properties,
          meta
        }
      }
    }
  }
}
