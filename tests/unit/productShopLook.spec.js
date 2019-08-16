import { shallowMount } from '@vue/test-utils'
import { defaultProduct } from '../../config/defaultObjects.js'
import ProductShopLook from '@/components/ProductShopLook'

describe('ProductShopLook.vue', () => {
  it('click image opens modal', async () => {
    const wrapper = shallowMount(ProductShopLook, {
      propsData: {
        imageSrc:
            'https://nacelle-assets.s3-us-west-2.amazonaws.com/article-featured-media.jpeg',
        products: [defaultProduct]
      }
    })

    const button = wrapper.find('.button')
    button.trigger('click')

    expect(wrapper.find('.shop-look-modal').exists()).toBe(true)
  })
})
