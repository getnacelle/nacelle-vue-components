import nmerge from 'nuxt-merge-asyncdata'
import { getShopPage, getPage } from '@nacelle/nacelle-tools'

export default params => {
  return nmerge({
    name: 'shop',
    mixins: [getShopPage(params), getPage({ pageHandle: 'shop' })]
  })
}
