import store from '../../src/store/store'
import { shallowMount } from '@vue/test-utils'
import CartFlyoutSubtotal from '@/components/CartFlyoutSubtotal'

describe('CartFlyoutHeader.vue', () => {
  it('displays the cart header', async () => {
    const wrapper = shallowMount(CartFlyoutSubtotal, {
      store,
      propsData: { cartSubtotal: 40.3 }
    })
    expect(wrapper.html()).toBe(
      '<div><h4><span>Subtotal:</span><span>$40.30</span></h4></div>'
    )
  })
})
