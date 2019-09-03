import { shallowMount } from '@vue/test-utils'
import ProductImage from '@/components/ProductImage'

describe('ProductImage/vue', () => {
  it('renders the image', async () => {
    const wrapper = shallowMount(ProductImage, {
      propsData: {
        source:
          'https://www.sparkawards.com/wp-content/uploads/2011/05/Product_Lg_Type-1024x791.jpg',
        alt: 'chair'
      }
    })
    wrapper.setData({ visible: true })
    expect(wrapper.html()).toBe(
      '<div class="product-image nacelle"><img src="https://www.sparkawards.com/wp-content/uploads/2011/05/Product_Lg_Type-1024x791.jpg" alt="chair"></div>'
    )
  })
})
