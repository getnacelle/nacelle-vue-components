import { mount } from '@vue/test-utils'
import ProductOptions from '@/components/ProductOptions'

describe('ProductOptionSwatch.vue', () => {
  const wrapper = mount(ProductOptions, {
    propsData: {
      options: [
        {
          name: 'Size',
          values: ['small', 'medium', 'large']
        }
      ]
    }
  })
  it('renders swatches', async () => {
    expect(wrapper.findAll('.swatches').exists()).toBe(true)
  })
})
