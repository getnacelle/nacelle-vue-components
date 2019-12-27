/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'

import ProductCategory from '../components/ProductCategory'

storiesOf('Components | Product', module)
  .addDecorator(withInfo)
  .add(
    'Category',
    () => ({
      components: { ProductCategory },
      template: '<product-category/>'
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
