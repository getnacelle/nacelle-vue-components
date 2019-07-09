/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withKnobs, button } from '@storybook/addon-knobs';
import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-vue-router'
import store from '../store/store'

import MainNavFlyout from '../components/MainNavFlyout'

const label = 'Toggle Menu';
const handler = () => {
  store.commit('menu/toggleShowMenu')
}

button(label, handler);

storiesOf('Components | Main Nav', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .add(
    'Main Nav Flyout',
    () => ({
      store,
      components: { MainNavFlyout },
      template: `
        <main-nav-flyout>
          <template v-slot:flyout-menu>
            <router-link class="main-nav-item" :to="'/shop'">Shop</router-link>
          </template>
        </main-nav-flyout>
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
