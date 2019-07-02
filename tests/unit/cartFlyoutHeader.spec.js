import store from '../../src/store/store'
import { mount } from '@vue/test-utils'
import CartFlyoutHeader from '@/components/CartFlyoutHeader'

describe('CartFlyoutHeader.vue', () => {
  it('displays the cart header', async () => {
    const wrapper = mount(CartFlyoutHeader, {
      propsData: { title: 'Your Cart' }
    })
    expect(wrapper.html()).toBe(
      '<div class="flyout-cart-header ui-border-bottom"><h3>Your Cart</h3> <img src="https://nacelle-assets.s3-us-west-2.amazonaws.com/default-close-icon.svg" class="close"></div>'
    )
  })
})
