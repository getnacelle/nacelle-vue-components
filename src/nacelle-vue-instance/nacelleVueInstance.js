import nmerge from 'nuxt-merge-asyncdata'
import nacelleBlogArticle from '../mixins/nacelleBlogArticle'
import nacelleDefaultLayout from '../mixins/nacelleDefaultLayout'

export default ({ type, ...rest }) => {
  switch (type) {
    case 'default-layout':
      return nmerge({ mixins: [nacelleDefaultLayout], ...rest })
    case 'product':
      break
    case 'collection':
      break
    case 'page':
      break
    case 'blog-article':
      return nmerge({ mixins: [nacelleBlogArticle], ...rest })
  }
}
