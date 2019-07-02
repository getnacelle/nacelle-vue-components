import store from '../../src/store/store'
import { shallowMount } from '@vue/test-utils'
import CartFlyoutItemRemoveButton from '@/components/CartFlyoutItemRemoveButton'

describe('CartFlyoutItemRemoveButton.vue', () => {
  it('removes a line item from the cart', async () => {
    store.state.cart.lineItems = [
      {
        image: {
          source: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
        },
        title: 'Gray T-Shirt',
        productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
        handle: 'gray-t-shirt',
        quantity: 1,
        variant: {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
        }
      }
    ]
    const wrapper = shallowMount(CartFlyoutItemRemoveButton, {
      store,
      propsData: {
        variantId:
          'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
      }
    })
    const input = wrapper.find('button')
    input.trigger('click')
    expect(store.state.cart.lineItems).toEqual([])
  })
})
