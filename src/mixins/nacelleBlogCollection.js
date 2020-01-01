import { mapGetters } from 'vuex'
import { getBlog } from '@nacelle/nacelle-tools'

export default params => {
  return {
    mixins: [getBlog(params)],
    computed: {
      ...mapGetters('space', ['getMetatag']),
      blogProducts() {
        if (this.blog && this.blog.products && this.blog.products.length > 0) {
          return this.blog.products
        }

        return null
      },
      featuredArticle() {
        if (this.articles.length > 0) {
          return this.articles[0]
        }

        return null
      },
      filteredArticles() {
        const copy = [...this.articles]
        return copy.splice(1, copy.length - 1)
      }
    },
    head() {
      const properties = {}
      const meta = []
      const title = this.getMetatag('title')

      let fullTitle = 'Blog'

      if (title) {
        fullTitle = `${fullTitle} | ${title.value}`
      }

      properties.title = fullTitle
      meta.push({
        hid: 'og:title',
        property: 'og:title',
        content: fullTitle
      })

      return {
        ...properties,
        meta
      }
    }
  }
}
