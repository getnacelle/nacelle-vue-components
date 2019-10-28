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
import SearchBox from '../components/SearchBox'
import RefinementFilters from '../components/RefinementFilters'
import SearchResults from '../components/SearchResults'
import SearchNoResults from '../components/SearchNoResults'
import ProductGrid from '../components/ProductGrid'
import staticData from '../../config/defaults/static-products'

const mock = new MockAdapter(axios);
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
  .addDecorator(withActions())
  .addDecorator(() => {
    return {
      template: `
        <div style="max-width: 1200px; margin: 3rem auto;"><story/></div>
      `
    }
  })
  .add(
    'Composition',
    () => {
      mock.onGet('/data/shop/static.json').reply(200, staticData)

      return {
        store,
        components: {
          SearchBox,
          RefinementFilters,
          SearchResults,
          SearchNoResults,
          ProductGrid
        },
        props: {
          filters: {
            type: Array,
            default: object('Filters Object', defaultFilters)
          }
        },
        data() {
          return {
            filteredData: []
          }
        },
        computed: {
          products () {
            return this.$store.getters['search/productData']
          },
          query () {
            return this.$store.state.search.query
          }
        },
        created () {
          this.$store.dispatch('search/getProductData')
        },
        methods: {
          onUpdate (outputData) {
            this.filteredData = outputData
          }
        },
        template: `
          <div>
            <div class="columns is-centered">
              <div class="column is-3">
                <search-box position="in-page" />
              </div>
            </div>
            <div class="columns">
              <div class="column is-3">
                <refinement-filters
                  :input-data="products"
                  :filter-properties="filters"
                  v-on:updated="onUpdate"
                />
              </div>
              <div class="column is-9">
                <search-results
                  v-if="filteredData"
                  :searchData="filteredData"
                  :searchQuery="query"
                >
                  <template v-slot:result="{ result }">
                    <product-grid :products="result" :columns="2" />
                  </template>
                  <template v-slot:no-results>
                    <search-no-results />
                  </template>
                </search-results>
              </div>
            </div>
          </div>
        `
      }
    },
    {
      info: {
        summary: `
        This is a complete example of all search components.
        `
      }
    }
  )