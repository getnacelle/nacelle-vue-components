/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import store from '../store/store'

import ProductVariantSelect from '../components/ProductVariantSelect'
import CartFlyout from '../components/CartFlyout'
import CartFlyoutItem from '../components/CartFlyoutItem'

import defaultMultivariate from '../../config/defaults/multivariateProduct'

storiesOf('Components | Product', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add(
    'Variant Select',
    () => ({
      components: {
        ProductVariantSelect,
        CartFlyout,
        CartFlyoutItem
      },
      store,
      props: {
        showAtc: {
          default: boolean('Show Add to Cart', true)
        }
      },
      data() {
        return {
          product: defaultMultivariate,
          variant: defaultMultivariate.variants[0]
        }
      },

      template: `
      <section class="section">
        <div class="columns is-centered">
        <div class="columns is-marginless is-paddingless">
        <product-variant-select
          :product="product"
          :variant="variant"
          v-on:variant-selected="onVariantSelect"
        />
      </div>
        </div>
      </section>`
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
