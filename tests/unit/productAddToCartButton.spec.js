import { shallowMount } from '@vue/test-utils'
import ProductAddToCartButton from '@/components/ProductAddToCartButton'
import store from '../../src/store/store'

describe('Product Add to Cart Button', () => {
  it('renders the button', async () => {
    const wrapper = shallowMount(ProductAddToCartButton, {
      store,
      propsData: {
        image: {
          source: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
        },
        title: 'Gray T-Shirt',
        productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
        handle: 'gray-t-shirt',
        variant: {}
      }
    })
    expect(wrapper.html()).toBe(
      '<div><button class="button is-primary"><span>Add to Cart</span></button></div>'
    )
  })
})
