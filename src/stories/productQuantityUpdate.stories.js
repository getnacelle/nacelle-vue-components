/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import QuantitySelector from '../components/QuantitySelector'
import store from '../store/store'

storiesOf('Components | Product', module)
  .addDecorator(withInfo)
  .add(
    'Quantity',
    () => ({
      store,
      components: { QuantitySelector },
      data() {
        return {
          quantity: 0
        }
      },
      template: `
        <div class="section">
          <quantity-selector
            :quantity.sync="quantity"
          />
        </div>
      `,
      mounted() {

      }
    }),
    {
      info: {
        summary: 'Increment or decrement quantity.'
      }
    }
  )
