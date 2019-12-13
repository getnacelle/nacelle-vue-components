/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import store from '../store/store'

import CartFlyoutSubtotal from '../components/CartFlyoutSubtotal'

storiesOf('Components | Cart', module)
  .addDecorator(withInfo)
  .add(
    'Flyout Subtotal',
    () => ({
      store,
      components: { CartFlyoutSubtotal },
      template: '<cart-flyout-subtotal/>',
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

        store.dispatch('cart/addLineItem', {
          image: {
            source:
              'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
          },
          title: 'Black T-Shirt',
          productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4djE3Mzc=',
          handle: 'black-t-shirt',
          price: '29.99',
          quantity: 1,
          variant: {
            id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWaudC8yODU2ODgyMDAyMzQwMQ=='
          }
        })
        store.dispatch('cart/addLineItem', {
          image: {
            source:
              'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
          },
          title: 'Brown T-Shirt',
          productId: 'Z2lkOi8vc2hvcGlmeS9QcmzkdWN0LzM1OTkyMDE4djE3Mzc=',
          handle: 'brown-t-shirt',
          price: '29.99',
          quantity: 1,
          variant: {
            id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWaudC8yODU3ODgyMDAyMzQwMQ=='
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
