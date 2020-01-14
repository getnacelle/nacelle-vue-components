import nmerge from 'nuxt-merge-asyncdata'
import nacelleBlogArticle from './mixins/nacelleBlogArticle'
import nacelleDefaultLayout from './mixins/nacelleDefaultLayout'
import nacelleHomepage from './mixins/nacelleHomepage'
import nacelleCollection from './mixins/nacelleCollection'
import nacellePage from './mixins/nacellePage'
import nacelleProduct from './mixins/nacelleProduct'
import nacelleErrorLayout from './mixins/nacelleErrorLayout'
import nacelleBlogCollection from './mixins/nacelleBlogCollection'
import nacelleSearchPage from './mixins/nacelleSearchPage'
import nacelleShopPage from './mixins/nacelleShopPage'

export default ({ type, params, ...rest }) => {
  console.log(type, params)
  switch (type) {
    case 'homepage':
      return nmerge({ mixins: [nacelleHomepage(params)], ...rest })
    case 'default-layout':
      return nmerge({ mixins: [nacelleDefaultLayout(params)], ...rest })
    case 'error-layout':
      return nmerge({ mixins: [nacelleErrorLayout(params)], ...rest })
    case 'product':
      return nmerge({ mixins: [nacelleProduct(params)], ...rest })
    case 'collection':
      return nmerge({ mixins: [nacelleCollection(params)], ...rest })
    case 'page':
      return nmerge({ mixins: [nacellePage(params)], ...rest })
    case 'blog-article':
      return nmerge({ mixins: [nacelleBlogArticle(params)], ...rest })
    case 'blog-collection':
      return nmerge({ mixins: [nacelleBlogCollection(params)], ...rest })
    case 'search':
      return nmerge({ mixins: [nacelleSearchPage(params)], ...rest })
    case 'shop':
      return nmerge({ mixins: [nacelleShopPage(params)], ...rest })
  }
}
