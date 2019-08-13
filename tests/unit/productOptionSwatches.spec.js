import { mount } from '@vue/test-utils'
import store from '../../src/store/store'
import ProductOptionSwatches from '@/components/ProductOptionSwatches'

describe('ProductOptionSwatch.vue', () => {
  const wrapper = mount(ProductOptionSwatches, {
    store,
    propsData: {
      option: {
        name: 'Size',
        values: [{ value: 'Small' }, { value: 'Medium' }, { value: 'Large' }]
      },
      selectedOptions: [],
      variants: [
        {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODg3MjA2MTcxNDUzNw==',
          price: '43.0',
          availableForSale: true,
          selectedOptions: [
            {
              name: 'Size',
              value: 'Small'
            },
            {
              name: 'Color',
              value: 'Red'
            }
          ],
          swatchSrc:
            'https://nacell-demo-assets.s3.amazonaws.com/swatches/Red.png'
        }
      ]
    }
  })
  it('renders swatches', async () => {
    expect(wrapper.findAll('.swatches').exists()).toBe(true)
  })
})
