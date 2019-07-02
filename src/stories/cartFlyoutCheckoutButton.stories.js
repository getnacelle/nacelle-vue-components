/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
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
      template: `<cart-flyout-checkout-button/>`
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
