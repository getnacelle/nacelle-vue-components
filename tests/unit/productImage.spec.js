import { shallowMount } from '@vue/test-utils'
import ProductImage from '@/components/ProductImage'

describe('ProductImage/vue', () => {
  it('renders an image', async () => {
    const wrapper = shallowMount(ProductImage, {
      propsData: {
        source:
          'https://www.sparkawards.com/wp-content/uploads/2011/05/Product_Lg_Type-1024x791.jpg',
        alt: 'chair'
      },
      data: function() {
        return {
          visible: true
        }
      }
    })
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
        resize: false
      },
      data: function() {
        return {
          visible: true
        }
      }
    })
    expect(wrapper.html()).toBe(
      '<div class="product-image nacelle"><picture><source srcset="https://cdn.shopify.com/s/files/1/0094/4098/5124/products/68.png?v=1563167567&amp;width=750&amp;format=webp" type="image/webp"> <img src="https://cdn.shopify.com/s/files/1/0094/4098/5124/products/68.png?v=1563167567&amp;width=750" alt="pillow"></picture></div>'
    )
  })

  it('optimizes the size of a Shopify image', async () => {
    const wrapper = shallowMount(ProductImage, {
      propsData: {
        source:
          'https://cdn.shopify.com/s/files/1/0094/4098/5124/products/68.png?v=1563167567&width=750',
        alt: 'pillow',
        reformat: false,
        resize: true
      },
      data: function() {
        return {
          visible: true,
          containerWidth: 450,
          containerHeight: 300
        }
      }
    })
    expect(wrapper.html()).toBe(
      '<div class="product-image nacelle"><img src="https://cdn.shopify.com/s/files/1/0094/4098/5124/products/68_450x300.png?v=1563167567" alt="pillow"></div>'
    )
  })

  it('optimizes both the size and the format of a Shopify image', async () => {
    const wrapper = shallowMount(ProductImage, {
      propsData: {
        source:
          'https://cdn.shopify.com/s/files/1/0094/4098/5124/products/68.png?v=1563167567&width=750',
        alt: 'pillow',
        reformat: true,
        resize: true
      },
      data: function() {
        return {
          visible: true,
          containerWidth: 450,
          containerHeight: 300
        }
      }
    })
    expect(wrapper.html()).toBe(
      '<div class="product-image nacelle"><picture><source srcset="https://cdn.shopify.com/s/files/1/0094/4098/5124/products/68_450x300.png?v=1563167567&amp;format=webp" type="image/webp"> <img src="https://cdn.shopify.com/s/files/1/0094/4098/5124/products/68.png?v=1563167567&amp;width=750" alt="pillow"></picture></div>'
    )
  })

  it('returns the default product image when the source url is undefined', async () => {
    const wrapper = shallowMount(ProductImage, {
      propsData: {
        source: undefined,
        alt: 'pillow'
      },
      data: function() {
        return {
          visible: true,
          containerWidth: 450,
          containerHeight: 300
        }
      }
    })
    expect(wrapper.html()).toBe(
      '<div class="product-image nacelle"><picture><source srcset="https://nacelle-assets.s3-us-west-2.amazonaws.com/default-product-image.svg" type="image/webp"> <img src="https://nacelle-assets.s3-us-west-2.amazonaws.com/default-product-image.svg" alt="pillow"></picture></div>'
    )
  })
})
