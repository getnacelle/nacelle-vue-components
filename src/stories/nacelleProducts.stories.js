/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-vue-router'
import store from '../store/store'

import NacelleProducts from '../components/NacelleProducts'

storiesOf('Components | Nacelle Data', module)
  .addDecorator(withInfo)
  .addDecorator(StoryRouter())
  .add(
    'Products',
    () => ({
      store,
      components: { NacelleProducts },
      template: `
        <div>
          <h3>Fetch One Product</h3>
          <nacelle-products :handle="'test 1'">
            <template v-slot:default="{ product, products }">
              <pre>{{ product }}</pre>
              <pre>{{ products }}</pre>
            </template>
          </nacelle-products>
          <h3>Fetch Array of Products</h3>
          <nacelle-products :handles="['test 1','test 2']">
            <template v-slot:default="{ product, products }">
              <pre>{{ product }}</pre>
              <pre>{{ products }}</pre>
            </template>
          </nacelle-products>
        </div>
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
