/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-vue-router'
import store from '../store/store'

import NacelleCollection from '../components/NacelleCollection'

storiesOf('Components | Nacelle Data', module)
  .addDecorator(withInfo)
  .addDecorator(StoryRouter())
  .add(
    'Collection',
    () => ({
      store,
      components: { NacelleCollection },
      template: `
        <div>
          <nacelle-collection :handle="'test 1'">
            <template v-slot:default="{ collection }">
              <pre>{{ collection }}</pre>
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
