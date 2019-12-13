/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import store from '../store/store'

import CartFlyoutHeader from '../components/CartFlyoutHeader'

storiesOf('Components | Cart', module)
  .addDecorator(withInfo)
  .add(
    'Flyout Header',
    () => ({
      store,
      components: { CartFlyoutHeader },
      data() {
        return {}
      },
      template: '<cart-flyout-header/>'
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
