/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
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
