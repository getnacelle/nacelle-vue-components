/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withKnobs, object } from '@storybook/addon-knobs'
import { withInfo } from 'storybook-addon-vue-info'

import ContentProductGrid from '../components/ContentProductGrid'

storiesOf('Components | Content / Product Grid', module)
  .addDecorator(withInfo)
  .add(
    'Default',
    () => ({
      components: { ContentProductGrid },
      data() {
        return {
          title: 'Product Grid'
        }
      },
      template: '<content-product-grid :title="title" />'
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
