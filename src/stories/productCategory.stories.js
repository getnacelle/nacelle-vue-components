/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
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
