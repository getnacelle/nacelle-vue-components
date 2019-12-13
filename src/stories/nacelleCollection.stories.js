/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'
import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-vue-router'
import store from '../store/store'

import NacelleCollection from '../components/NacelleCollection'

storiesOf('Components | Nacelle Data / Collection', module)
  .addDecorator(withInfo)
  .addDecorator(StoryRouter())
  .add(
    'No pagination',
    () => ({
      store,
      components: { NacelleCollection },
      template: `
        <div>
          <nacelle-collection :handle="'test 1'">
            <template v-slot:default="{ collection, products }">
              <pre>{{ collection }}</pre>
              <pre>{{ products }}</pre>
            </template>
          </nacelle-collection>
        </div>
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )

storiesOf('Components | Nacelle Data / Collection', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .add(
    'Pagination',
    () => ({
      store,
      components: { NacelleCollection },
      props: {
        productsPerPage: {
          default: number('Products per Page', 1)
        },
        buttonText: {
          default: text('Button Text', 'Load More')
        },
        buttonLoadMore: {
          default: boolean('Use Button Load More', true)
        }
      },
      template: `
        <div>
          <nacelle-collection
            :handle="'test 1'"
            :paginate="true"
            :products-per-page="productsPerPage"
            :use-button-load-more="buttonLoadMore"
            :button-text="buttonText"
          >
            <template v-slot:default="{ products }">
              <div v-for="product in products">
                <pre>{{ product }}</pre>
              </div>
            </template>
          </nacelle-collection>
        </div>
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
