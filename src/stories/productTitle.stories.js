/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'

import ProductTitle from '../components/ProductTitle'

import store from '../store/store'

storiesOf('Components | Product', module)
  .addDecorator(withInfo)
  .add(
    'Title',
    () => ({
      store,
      components: { ProductTitle },
      template: '<product-title/>'
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
