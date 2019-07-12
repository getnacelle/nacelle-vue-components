import store from '../../src/store/store'
import { shallowMount } from '@vue/test-utils'
import ProductQuantityUpdate from '@/components/ProductQuantityUpdate'
import { defaultLineItem } from '../../config/defaultObjects.js'

describe('ProductQuantityUpdate.vue', () => {
  it('if quantity is 0 it adds product to cart', async () => {
    const wrapper = shallowMount(ProductQuantityUpdate, {
      store,
      propsData: {
        image: defaultLineItem.image,
        title: defaultLineItem.title,
        handle: defaultLineItem.handle,
        variant: defaultLineItem.variant,
        productId: defaultLineItem.productId
      }
    })
    const input = wrapper.find('.increment')

    input.trigger('click')

    expect(store.state.cart.lineItems).toEqual([
      {
        ...defaultLineItem,
        quantity: 1
      }
    ])
  })

  it('increments the product quantity', async () => { 
    const wrapper = shallowMount(ProductQuantityUpdate, {
      store,
      propsData: {
        image: defaultLineItem.image,
        title: defaultLineItem.title,
        handle: defaultLineItem.handle,
        variant: defaultLineItem.variant,
        productId: defaultLineItem.productId
      }
    })
    const input = wrapper.find('.increment')

    store.state.cart.lineItems = [{
      ...defaultLineItem,
      quantity: 1
    }]
    input.trigger('click')

    expect(store.state.cart.lineItems).toEqual([
      {
        ...defaultLineItem,
        quantity: 2
      }
    ])
  })

  it('decrements the product quantity', async () => { 
    const wrapper = shallowMount(ProductQuantityUpdate, {
      store,
      propsData: {
        image: defaultLineItem.image,
        title: defaultLineItem.title,
        handle: defaultLineItem.handle,
        variant: defaultLineItem.variant,
        productId: defaultLineItem.productId
      }
    })
    const input = wrapper.find('.decrement')

    store.state.cart.lineItems = [{
      ...defaultLineItem,
      quantity: 2
    }]
    input.trigger('click')

    expect(store.state.cart.lineItems).toEqual([
      {
        ...defaultLineItem,
        quantity: 1
      }
    ])
  })

  it('if quantity equals 1 decrement removes item', async () => { 
    const wrapper = shallowMount(ProductQuantityUpdate, {
      store,
      propsData: {
        image: defaultLineItem.image,
        title: defaultLineItem.title,
        handle: defaultLineItem.handle,
        variant: defaultLineItem.variant,
        productId: defaultLineItem.productId
      }
    })
    const input = wrapper.find('.decrement')

    store.state.cart.lineItems = [{
      ...defaultLineItem,
      quantity: 1
    }]
    input.trigger('click')

    expect(store.state.cart.lineItems.length).toEqual(0)
  })
})
