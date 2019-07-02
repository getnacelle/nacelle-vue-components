/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withInfo } from 'storybook-addon-vue-info'
import ProductQuantityUpdate from '../components/ProductQuantityUpdate'

import store from '../store/store'

storiesOf('Components | Product', module)
  .addDecorator(withInfo)
  .add(
    'Quantity',
    () => ({
      store,
      components: { ProductQuantityUpdate },
      data() {
        return {
          variantId:
            'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ==',
          quantity: 1
        }
      },
      template:
        '<div class="section"><product-quantity-update :variantId="variantId" :quantity="quantity"/>',
      mounted() {
        store.commit('cart/setLineItems', [])
        store.dispatch('cart/addLineItem', {
          image: {
            source:
              'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
          },
          title: 'Gray T-Shirt',
          productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
          handle: 'gray-t-shirt',
          price: '29.99',
          quantity: 1,
          variant: {
            id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
          }
        })
      }
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
