/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { storiesOf } from '@storybook/vue'
import { withActions, action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withKnobs, button } from '@storybook/addon-knobs'
import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-vue-router'
import store from '../store/store'
import SearchBox from '../components/SearchBox'
import staticData from '../../config/defaults/static-products'

const mock = new MockAdapter(axios);

storiesOf('Components | Search', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .addDecorator(withActions())
  .addDecorator(() => {
    return {
      template: `
        <div style="max-width: 450px; margin: 3rem auto;"><story/></div>
      `
    }
  })
  .add(
    'Search Box - Global',
    () => {
      mock.onGet('/data/shop/static.json').reply(200, staticData)

      return {
        store,
        components: { SearchBox },
        template: `
          <search-box />
        `
      }
    },
    {
      info: {
        // summary: "Hello"
      }
    }
  )

  storiesOf('Components | Search', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .addDecorator(withActions())
  .addDecorator(() => {
    return {
      template: `
        <div style="max-width: 450px; margin: 3rem auto;"><story/></div>
      `
    }
  })
  .add(
    'Search Box - In Page',
    () => {
      mock.onGet('/data/shop/static.json').reply(200, staticData)

      return {
        store,
        components: { SearchBox },
        template: `
          <search-box position="in-page" />
        `
      }
    },
    {
      info: {
        // summary: "Hello"
      }
    }
  )
