/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs, boolean } from '@storybook/addon-knobs';

import store from '../store/store'

import ProductVariantDropdown from '../components/ProductVariantDropdown'
import CartFlyout from '../components/CartFlyout'
import CartFlyoutItem from '../components/CartFlyoutItem'

import defaultMultivariate  from '../../config/defaults/multivariateProduct'

storiesOf('Components | Product', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add(
    'Variant Dropdown',
    () => ({
      components: {
        ProductVariantDropdown,
        CartFlyout,
        CartFlyoutItem
      },
      store,
      props: {
        showAtc: {
          default: boolean('Show Add to Cart', true),
        }
      },
      data() {
        return {
          product: defaultMultivariate,
          variant: defaultMultivariate.variants[0]
        }
      },
      methods: {
        onVariantSelect ({ selectedVariant }) {
          console.log(selectedVariant)
          this.variant = selectedVariant
        }
      },
      template: `
      <section class="section">
        <div class="columns is-centered">
          <div class="column is-4-desktop is-8-tablet">
            <product-variant-dropdown
              :product="product"
              :variant="variant"
              :show-add-to-cart="showAtc"
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
