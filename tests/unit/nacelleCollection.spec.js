import { createLocalVue, shallowMount } from '@vue/test-utils'
import nacellePlugin from './../../__mocks__/nacelle-vue-plugin'
import NacelleCollection from '@/components/NacelleCollection'

const delay = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 200)
  })
}

describe('NacelleCollection.vue', () => {
  global.process.client = true

  it('loads a collection', async () => {
    const localVue = createLocalVue()
    localVue.use(nacellePlugin)

    const wrapper = shallowMount(NacelleCollection, {
      localVue,
      propsData: {
        handle: 'test'
      }
    })

    await delay() // mock data-loader loading product data
    
    expect(typeof wrapper.vm.collection !== 'undefined').toBe(true)
  })
})