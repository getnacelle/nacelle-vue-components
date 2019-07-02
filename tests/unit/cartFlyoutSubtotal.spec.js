import store from '../../src/store/store'
import { mount } from '@vue/test-utils'
import CartFlyoutSubtotal from '@/components/CartFlyoutSubtotal'

describe('CartFlyoutSubtotal.vue', () => {
  it('displays the cart subtotal', async () => {
    const wrapper = mount(CartFlyoutSubtotal, {
      store
    })
    store.dispatch('cart/addLineItem', {
      image: {
        source: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
      },
      title: 'Gray T-Shirt',
      price: '29.99',
      productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
      handle: 'gray-t-shirt',
      quantity: 1,
      variant: {
        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
      }
    })
    expect(wrapper.vm.cartSubtotal).toBe(29.99)
  })
})
