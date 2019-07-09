/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-vue-router'
import store from '../store/store'

import MainNav from '../components/MainNav'

storiesOf('Components | Main Nav', module)
  .addDecorator(withInfo)
  .addDecorator(StoryRouter())
  .add(
    'Main Nav',
    () => ({
      store,
      components: { MainNav },
      template: `
        <main-nav />
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
