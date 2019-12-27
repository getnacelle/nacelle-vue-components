import { shallowMount } from '@vue/test-utils'
import InterfaceIcon from '@/components/InterfaceIcon'

describe('InterfaceIcon.vue', () => {
  it('renders an svg', async () => {
    const wrapper = shallowMount(InterfaceIcon, {
      propsData: { iconName: 'cart', iconAction: 'cart/showCart' }
    })

    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.html()).toEqual(
      '<div class="interface-icon nacelle" iconaction="cart/showCart"><img src="https://nacelle-assets.s3-us-west-2.amazonaws.com/default-cart-icon.svg" class="icon"></div>'
    )
  })
})
