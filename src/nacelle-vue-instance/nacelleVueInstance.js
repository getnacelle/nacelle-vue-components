import nmerge from 'nuxt-merge-asyncdata'
import nacelleBlogArticle from './mixins/nacelleBlogArticle'
import nacelleDefaultLayout from './mixins/nacelleDefaultLayout'
import nacelleHomepage from './mixins/nacelleHomepage'
import nacelleCollection from './mixins/nacelleCollection'
import nacellePage from './mixins/nacellePage'
import nacelleProduct from './mixins/nacelleProduct'
import nacelleErrorLayout from './mixins/nacelleErrorLayout'
import nacelleBlogCollection from './mixins/nacelleBlogCollection'

export default ({ type, ...rest }) => {
  switch (type) {
    case 'homepage':
      return nmerge({ mixins: [nacelleHomepage], ...rest })
    case 'default-layout':
      return nmerge({ mixins: [nacelleDefaultLayout], ...rest })
    case 'error-layout':
      return nmerge({ mixins: [nacelleErrorLayout], ...rest })
    case 'product':
      return nmerge({ mixins: [nacelleProduct], ...rest })
    case 'collection':
      return nmerge({ mixins: [nacelleCollection], ...rest })
    case 'page':
      return nmerge({ mixins: [nacellePage], ...rest })
    case 'blog-article':
      return nmerge({ mixins: [nacelleBlogArticle], ...rest })
    case 'blog-collection':
      return nmerge({ mixins: [nacelleBlogCollection], ...rest })
  }
}
