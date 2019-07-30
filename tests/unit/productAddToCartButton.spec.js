import { shallowMount } from '@vue/test-utils'
import ProductAddToCartButton from '@/components/ProductAddToCartButton'
import store from '../../src/store/store'

describe('Product Add to Cart Button', () => {
  it('renders the button', async () => {
    const wrapper = shallowMount(ProductAddToCartButton, {
      store,
      propsData: {
        priceRange: {
          min: '10.99',
          max: '29.99'
        },
        title: 'Awesome T-Shirt',
        category: "Men's Shirts",
        featuredMedia: {
          src: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg',
          thumbnailSrc:
            'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
        },
        description:
          "<p>This is the t-shirt description. It's a really nice item, isn't it? You can buy it in different colors and sizes.</p>",
        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
        handle: 'gray-t-shirt',
        variants: [
          {
            id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ==',
            price: '29.99'
          }
        ],
        options: [
          {
            name: 'Size',
            values: ['xs', 's']
          }
        ]
      }
    })
    expect(wrapper.findAll('button').exists()).toBe(true)
  })
  it('bypasses option logic if there is only one option/value', async () => {
    const wrapper = shallowMount(ProductAddToCartButton, {
      store,
      propsData: {
        product: {
          priceRange: {
            min: '10.99',
            max: '29.99'
          },
          title: 'Awesome T-Shirt',
          category: "Men's Shirts",
          featuredMedia: {
            src: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg',
            thumbnailSrc:
              'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
          },
          description:
            "<p>This is the t-shirt description. It's a really nice item, isn't it? You can buy it in different colors and sizes.</p>",
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
          handle: 'gray-t-shirt',
          variants: [
            {
              id:
                'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ==',
              price: '29.99'
            }
          ],
          options: [
            {
              name: 'Size',
              values: ['xs']
            }
          ]
        }
      }
    })
    expect(wrapper.vm.allSelected).toBe(true)
  })
})
