import { shallowMount } from '@vue/test-utils'
import ProductTitle from '@/components/ProductTitle'

describe('ProductTitle.vue', () => {
  it('renders a title', async () => {
    const wrapper = shallowMount(ProductTitle, {
      propsData: { title: 'Great Product' }
    })
    expect(wrapper.html()).toBe('<h3>Great Product</h3>')
  })

  it('renders a specific html element when passed', async () => {
    const wrapper = shallowMount(ProductTitle, {
      propsData: { title: 'Great Product', element: 'h2' }
    })
    expect(wrapper.html()).toBe('<h2>Great Product</h2>')
  })
})
