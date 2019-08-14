/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-vue-router'
import store from '../store/store'

storiesOf('Store', module)
  .addDecorator(withInfo)
  .addDecorator(StoryRouter())
  .add(
    'Test Store Modules',
    () => ({
      store,
      mounted() {
        store.dispatch('events/getUserId')
      },
      template: `
      <div>Testing Store Modules</div>
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
