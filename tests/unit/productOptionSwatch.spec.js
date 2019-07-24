import { shallowMount } from '@vue/test-utils'
import ProductOptionSwatch from '@/components/ProductOptionSwatch'

describe('ProductOptionSwatch.vue', () => {
  const wrapper = shallowMount(ProductOptionSwatch, {
    propsData: { value: 'nice' }
  })
  it('renders a swatch', async () => {
    expect(wrapper.findAll('div').exists()).toBe(true)
    expect(wrapper.text()).toBe('nice')
  })
  it('emits an event when clicked', () => {
    wrapper.trigger('click')
    expect(wrapper.emitted().swatchValue).toBeTruthy()
  })
})
