import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import ContentHeroBanner from '@/components/ContentHeroBanner'
import Vuex from 'vuex'

import store from '../../src/store/store'
const localVue = createLocalVue()
localVue.use(Vuex)

const defaults = {
  backgroundImgUrl:
    'https://nacelle-assets.s3-us-west-2.amazonaws.com/default-banner-img.png',
  title: 'Hero Title',
  subtitle: 'Subtitle copy text',
  ctaText: 'CTA BUTTON'
}

describe('ContentHeroBanner.vue', () => {
  it('renders a banner', async () => {
    const wrapper = shallowMount(ContentHeroBanner, {
      store,
      propsData: { ...defaults }
    })
    expect(wrapper.classes()).toContain('hero')
  })

  it('button click triggers custom event', () => {
    const mockClickHandler = jest.fn()
    const wrapper = mount(ContentHeroBanner, {
      store,
      propsData: {
        ...defaults,
        ctaHandler: mockClickHandler
      }
    })
    const button = wrapper.find('button')

    button.trigger('click')

    expect(mockClickHandler).toHaveBeenCalled()
  })
})
