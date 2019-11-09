import { shallowMount } from '@vue/test-utils'
import ProductImage from '@/components/ProductImage'

describe('ProductImage/vue', () => {
  it('renders an image', async () => {
    const wrapper = shallowMount(ProductImage, {
      propsData: {
        source:
          'https://www.sparkawards.com/wp-content/uploads/2011/05/Product_Lg_Type-1024x791.jpg',
        alt: 'chair'
      }
    })
    wrapper.setData({ visible: true })
    expect(wrapper.html()).toBe(
      '<div class="product-image nacelle"><img src="https://www.sparkawards.com/wp-content/uploads/2011/05/Product_Lg_Type-1024x791.jpg" alt="chair"></div>'
    )
  })
  
  it('optimizes the format of a Shopify image', async () => {
    const wrapper = shallowMount(ProductImage, {
      propsData: {
        source:
          'https://cdn.shopify.com/s/files/1/0094/4098/5124/products/68.png?v=1563167567&width=750',
        alt: 'pillow',
        optimizedSize: false
      }
    })
    wrapper.setData({ visible: true })
    expect(wrapper.html()).toBe(
      '<div class="product-image nacelle"><img src="https://cdn.shopify.com/s/files/1/0094/4098/5124/products/68.png?v=1563167567&amp;width=750&amp;format=pjpg" alt="pillow"></div>'
    )
  })
  
  it('optimizes the size of a Shopify image', async () => {
    const wrapper = shallowMount(ProductImage, {
      propsData: {
        source:
          'https://cdn.shopify.com/s/files/1/0094/4098/5124/products/68.png?v=1563167567&width=750',
        alt: 'pillow',
        optimizedFormat: false
      }
    })
    wrapper.setData({ visible: true, containerWidth: 450 })
    expect(wrapper.html()).toBe(
      '<div class="product-image nacelle"><img src="https://cdn.shopify.com/s/files/1/0094/4098/5124/products/68.png?v=1563167567&amp;width=450" alt="pillow"></div>'
    )
  })

  it('optimizes both the size and the format of a Shopify image', async () => {
    const wrapper = shallowMount(ProductImage, {
      propsData: {
        source:
          'https://cdn.shopify.com/s/files/1/0094/4098/5124/products/68.png?v=1563167567&width=750',
        alt: 'pillow',
      }
    })
    wrapper.setData({ visible: true, containerWidth: 450 })
    expect(wrapper.html()).toBe(
      '<div class="product-image nacelle"><img src="https://cdn.shopify.com/s/files/1/0094/4098/5124/products/68.png?v=1563167567&amp;width=450&amp;format=pjpg" alt="pillow"></div>'
    )
  })
})
