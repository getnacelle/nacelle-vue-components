import { shallowMount } from '@vue/test-utils'
import ProductCategory from '@/components/ProductCategory'

describe('ProductCategory.vue', () => {
  it('renders the product category', async () => {
    const wrapper = shallowMount(ProductCategory, {
      propsData: { category: 'Test' }
    })
    expect(wrapper.html()).toBe(`<div class="product-category nacelle"><p class="product-category-text">
      Test
    </p></div>`)
  })
})
