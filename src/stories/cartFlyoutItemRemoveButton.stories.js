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
          id:
            'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ==::106d9dd5-44ec-4b0b-b558-0c42657bf812'
        }
      },
      template: '<cart-flyout-item-remove-button :lineId="id"/>'
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
