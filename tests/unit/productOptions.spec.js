import { mount } from '@vue/test-utils'
import store from '../../src/store/store'
import ProductOptions from '@/components/ProductOptions'

describe('ProductOptionSwatch.vue', () => {
  const wrapper = mount(ProductOptions, {
    store,
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
