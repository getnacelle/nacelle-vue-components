import { getShopPage, getPage } from '@nacelle/nacelle-tools'

export default params => {
  return {
    name: 'shop',
    mixins: [getShopPage(params), getPage({ pageHandle: 'shop' })]
  }
}
