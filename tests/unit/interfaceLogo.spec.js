import { shallowMount } from '@vue/test-utils'
import InterfaceLogo from '@/components/InterfaceLogo'

describe('InterfaceLogo.vue', () => {
  it('renders an image', async () => {
    const wrapper = shallowMount(InterfaceLogo, {
      propsData: {
        src:
          'https://nacelle-assets.s3-us-west-2.amazonaws.com/nacelle-logo-dark.png'
      }
    })
    expect(wrapper.find('img').exists()).toBe(true)
  })
})
