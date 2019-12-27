/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'

import ProductImage from '../components/ProductImage'

storiesOf('Components | Product', module)
  .addDecorator(withInfo)
  .add(
    'Image',
    () => ({
      components: { ProductImage },
      template: `<div class="columns">
        <div class="column is-6">
          <product-image :width="500"/>
        </div>
      </div>`
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
