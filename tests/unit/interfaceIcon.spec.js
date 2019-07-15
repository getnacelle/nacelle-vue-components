import { shallowMount, createLocalVue } from '@vue/test-utils'
import InterfaceIcon from '@/components/InterfaceIcon'
import StoryRouter from 'storybook-vue-router'

describe('InterfaceIcon.vue', () => {
  it('renders an svg', async () => {
    const wrapper = shallowMount(InterfaceIcon, {
      propsData: { iconName: 'cart', iconAction: 'cart/showCart' }
    })

    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.html()).toEqual(
      '<div iconaction="cart/showCart"><img src="https://nacelle-assets.s3-us-west-2.amazonaws.com/default-cart-icon.svg" class="icon"></div>'
    )
  })
})
