/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withInfo } from 'storybook-addon-vue-info'
import store from '../store/store'

import CartFlyoutItem from '../components/CartFlyoutItem'

storiesOf('Components | Cart', module)
  .addDecorator(withInfo)
  .add(
    'Flyout Item',
    () => ({
      store,
      components: { CartFlyoutItem },
      data() {
        return {
          item: {
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
          }
        }
      },
      template: `<div class="columns">
        <div class="column is-4">
            <cart-flyout-item :item="item"/>
        </div>
      </div>`
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
