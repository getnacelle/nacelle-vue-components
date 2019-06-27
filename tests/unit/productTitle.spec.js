import { shallowMount, createLocalVue } from '@vue/test-utils'
import ProductTitle from '@/components/ProductTitle'
const localVue = createLocalVue()
import Vuex from 'vuex'
localVue.use(Vuex)

import store from '../../src/store/store'

describe('ProductTitle.vue', () => {
  it('renders a title', async () => {
    const wrapper = shallowMount(ProductTitle, {
      store,
      localVue,
      propsData: { title: 'Great Product' }
    })
    expect(wrapper.html()).toBe('<h3 class="title">Great Product</h3>')
  })

  it('renders a specific html element when passed', async () => {
    const wrapper = shallowMount(ProductTitle, {
      store,
      localVue,
      propsData: { title: 'Great Product', element: 'h2' }
    })
    expect(wrapper.html()).toBe('<h2 class="title">Great Product</h2>')
  })
})
