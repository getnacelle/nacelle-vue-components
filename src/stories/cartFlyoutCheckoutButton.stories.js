/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import store from '../store/store'

import CartFlyoutCheckoutButton from '../components/CartFlyoutCheckoutButton'

storiesOf('Components | Cart', module)
  .addDecorator(withInfo)
  .add(
    'Flyout Checkout Button',
    () => ({
      store,
      components: { CartFlyoutCheckoutButton },
      data() {
        return {}
      },
      template: '<cart-flyout-checkout-button/>'
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
