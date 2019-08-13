import store from '../../src/store/store'
import { defaultProduct } from '../../config/defaultObjects.js'


describe('Event Store', () => {
  it('sets the product in vuex store', () => {
    store.commit('product/setProduct', defaultProduct)

    expect(store.state.product.product.id)
      .toEqual(defaultProduct.id)
  })

  it('gets first variant if no variant selected', () => {
    store.commit('product/setProduct', defaultProduct)
    
    expect(store.getters['product/currentVariant'].id)
      .toEqual(defaultProduct.variants[0].id)
  })

  it('sets the selected variant', () => {
    const variant = {
      id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ==',
      price: '29.99'
    }

    store.commit('product/setProduct', defaultProduct)
    store.commit('product/setSelectedVariant', variant)

    expect(store.state.product.selectedVariant.id)
      .toEqual(variant.id)
  })

  it('sets the selected variant by id', () => {
    const variantId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='

    store.commit('product/setProduct', defaultProduct)
    store.commit('product/setSelectedVariantById', variantId)

    expect(store.state.product.selectedVariant.id)
      .toEqual(variantId)
  })
})
