/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withInfo } from 'storybook-addon-vue-info'
import ProductQuantityUpdate from '../components/ProductQuantityUpdate'
import { defaultLineItem } from '../../config/defaultObjects.js'
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
          lineItem: defaultLineItem
        }
      },
      template: `
        <div class="section">
          <product-quantity-update
            :image="lineItem.image"
            :title="lineItem.title"
            :productId="lineItem.productId"
            :handle="lineItem.handle"
            :variant="lineItem.variant"
          />
        </div>
      `,
      mounted() {
        store.commit('cart/setLineItems', [])
        // store.dispatch('cart/addLineItem', {
        //   image: {
        //     source:
        //       'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
        //   },
        //   title: 'Gray T-Shirt',
        //   productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
        //   handle: 'gray-t-shirt',
        //   price: '29.99',
        //   quantity: 1,
        //   variant: {
        //     id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
        //   }
        // })
      }
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
