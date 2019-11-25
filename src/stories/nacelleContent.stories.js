/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-vue-router'
import store from '../store/store'

import NacelleContent from '../components/NacelleContent'
import PageContent from '../components/PageContent'

storiesOf('Components | Nacelle Data', module)
  .addDecorator(withInfo)
  .addDecorator(StoryRouter())
  .add(
    'Content',
    () => ({
      store,
      components: { NacelleContent, PageContent },
      template: `
        <div>
          <nacelle-content :handle="'test 1'" :type="'content'">
            <template v-slot:default="{ content }">
              <page-content :page="content" />
            </template>
          </nacelle-content>
        </div>
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
