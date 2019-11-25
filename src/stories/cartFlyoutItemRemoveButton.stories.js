/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import store from '../store/store'

import CartFlyoutItemRemoveButton from '../components/CartFlyoutItemRemoveButton'

storiesOf('Components | Cart', module)
  .addDecorator(withInfo)
  .add(
    'Remove Button',
    () => ({
      store,
      components: { CartFlyoutItemRemoveButton },
      data() {
        return {
          variantId:
            'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
        }
      },
      template: '<cart-flyout-item-remove-button :variantId="variantId"/>'
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
