/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { storiesOf } from '@storybook/vue'
import { withActions, action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withKnobs, object } from '@storybook/addon-knobs'
import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-vue-router'
import store from '../store/store'
import RefinementFilters from '../components/RefinementFilters'
import searchResults from '../../config/defaults/search-results'

const defaultFilters = [
  {
    field:'productType',
    label:'Product Type'
  }
]

storiesOf('Components | Search', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .addDecorator(withActions('updated'))
  .addDecorator(() => {
    return {
      template: `
        <div style="max-width: 450px; margin: 3rem auto;"><story/></div>
      `
    }
  })
  .add(
    'Refinement Filters',
    () => ({
        store,
        components: { RefinementFilters },
        props: {
          filters: {
            type: Object,
            default: object('Filters Object', defaultFilters)
          }
        },
        data () {
          return {
            products: searchResults,
            filtered: []
          }
        },
        methods: {
          onUpdate: action('Products Filtered')
        },
        template: `
          <refinement-filters
            :input-data="products"
            :filter-properties="filters"
            v-on:updated="onUpdate"
          />
        `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
