import { shallowMount } from '@vue/test-utils'
import ProductDescription from '@/components/ProductDescription'

describe('ProductDescription.vue', () => {
  it('renders the product description', async () => {
    const wrapper = shallowMount(ProductDescription, {
      propsData: { description: '<p>This is the description</p>' }
    })
    expect(wrapper.html()).toBe(
      '<div class="product-description nacelle"><p>This is the description</p></div>'
    )
  })
})
