import { createLocalVue, shallowMount } from '@vue/test-utils'
import nacellePlugin from './../../__mocks__/nacelle-vue-plugin'
import NacelleProducts from '@/components/NacelleProducts'

const delay = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 200)
  })
}

describe('NacelleProducts.vue', () => {
  global.process.client = true

  it('loads single product', async () => {
    const localVue = createLocalVue()
    localVue.use(nacellePlugin)

    const wrapper = shallowMount(NacelleProducts, {
      localVue,
      propsData: {
        handle: 'gray-t-shirt'
      }
    })

    await delay() // mock data-loader loading product data
    
    expect(typeof wrapper.vm.product !== 'undefined').toBe(true)
  })

  it('loads an array of products', async () => {
    const localVue = createLocalVue()
    localVue.use(nacellePlugin)

    const wrapper = shallowMount(NacelleProducts, {
      localVue,
      propsData: {
        handles: ['gray-t-shirt','gray-t-shirt']
      }
    })

    await delay() // mock data-loader loading product data
    
    expect(wrapper.vm.products.length).toBe(2)
  })
})