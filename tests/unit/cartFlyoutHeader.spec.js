import store from '../../src/store/store'
import { shallowMount } from '@vue/test-utils'
import CartFlyoutHeader from '@/components/CartFlyoutHeader'

describe('CartFlyoutHeader.vue', () => {
  it('displays the cart header', async () => {
    const wrapper = shallowMount(CartFlyoutHeader, {
      propsData: { title: 'Your Cart' }
    })
    expect(wrapper.html()).toBe(
      '<div><h3 class="flyout-cart-header">Your Cart</h3></div>'
    )
  })
})
