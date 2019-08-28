import { mount } from '@vue/test-utils'
import store from '../../src/store/store'
import ProductCard from '@/components/ProductCard'

describe('ProductCard.vue', () => {
  const defaultProduct = {
    priceRange: {
      max: '29.99'
    },
    title: 'Awesome T-Shirt',
    category: "Men's Shirts",
    featuredMedia: {
      src: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
    },
    description:
      "<p>This is the t-shirt description. It's a really nice item, isn't it? You can buy it in different colors and sizes.</p>",
    productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
    handle: 'gray-t-shirt',
    variants: [
      {
        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
      }
    ]
  }

  store.state.cart.lineItems = [
    {
      image: {
        source: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
      },
      title: 'Gray T-Shirt',
      productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
      handle: 'gray-t-shirt',
      quantity: 1,
      variant: {
        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
      }
    }
  ]

  it('renders a product card', async () => {
    const wrapper = mount(ProductCard, {
      stubs: ['router-link'],
      store,
      propsData: {
        product: defaultProduct
      }
    })

    expect(wrapper.find('.product-card').exists()).toBe(true)

    const title = wrapper.find('.product-title')
    expect(title.text()).toBe('Awesome T-Shirt')
  })
})
