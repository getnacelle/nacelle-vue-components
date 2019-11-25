/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'

import ProductDescription from '../components/ProductDescription'

storiesOf('Components | Product', module)
  .addDecorator(withInfo)
  .add(
    'Description',
    () => ({
      components: { ProductDescription },
      template: '<product-description/>'
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
