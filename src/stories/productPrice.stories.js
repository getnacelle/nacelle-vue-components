/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'

import ProductPrice from '../components/ProductPrice'

storiesOf('Components | Product', module)
  .addDecorator(withInfo)
  .add(
    'Price',
    () => ({
      components: { ProductPrice },
      data() {
        return {
          price: '29.59'
        }
      },
      template:
        '<product-price :price="price" show-currency-code></product-price>'
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
