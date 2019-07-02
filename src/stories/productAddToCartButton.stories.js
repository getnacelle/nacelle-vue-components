/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withInfo } from 'storybook-addon-vue-info'
import store from '../store/store'

import ProductAddToCartButton from '../components/ProductAddToCartButton'

storiesOf('Components | Product', module)
  .addDecorator(withInfo)
  .add(
    'Add To Cart Button',
    () => ({
      store,
      components: { ProductAddToCartButton },
      data() {
        return {
          image: {
            source:
              'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
          },
          title: 'Gray T-Shirt',
          productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
          handle: 'gray-t-shirt',
          variant: {
            id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
          }
        }
      },
      template:
        '<product-add-to-cart-button :image="image" :title="title" :productId="productId" :handle="handle" :variant="variant"/>'
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
