/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import store from '../store/store'

import MainNavBurger from '../components/MainNavBurger'

storiesOf('Components | Main Nav', module)
  .addDecorator(withInfo)
  .addDecorator(() => {
    return {
      template: '<div style="padding: 3rem;"><story/></div>'
    }
  })
  .add(
    'Burger',
    () => ({
      store,
      components: { MainNavBurger },
      template: `
        <main-nav-burger />
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
