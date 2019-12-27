/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { storiesOf } from '@storybook/vue'
import { withActions } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-vue-router'
import store from '../store/store'
import SearchBox from '../components/SearchBox'
import searchResults from '../../config/defaults/search-results'

storiesOf('Components | Search', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .addDecorator(withActions())
  .addDecorator(() => ({
    template: `
      <div style="max-width: 450px; margin: 3rem auto;"><story/></div>
    `
  }))
  .add(
    'Search Box - Global',
    () => ({
      store,
      components: { SearchBox },
      template: `
        <search-box />
      `,
      created() {
        const mock = new MockAdapter(axios)

        mock.onGet('/data/search.json').reply(200, searchResults)
      }
    }),
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
  .addDecorator(() => ({
    template: `
      <div style="max-width: 450px; margin: 3rem auto;"><story/></div>
    `
  }))
  .add(
    'Search Box - In Page',
    () => ({
      store,
      components: { SearchBox },
      template: `
        <search-box position="in-page" />
      `,
      created() {
        const mock = new MockAdapter(axios)

        mock.onGet('/data/search.json').reply(200, searchResults)
      }
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
