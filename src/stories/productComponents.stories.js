/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'

import store from '../store/store'

import ProductImage from '../components/ProductImage'
import ProductPrice from '../components/ProductPrice'
import ProductTitle from '../components/ProductTitle'
import ProductDescription from '../components/ProductDescription'
import ProductCategory from '../components/ProductCategory'
import ProductAddToCartButton from '../components/ProductAddToCartButton'
import ProductQuantityUpdate from '../components/ProductQuantityUpdate'
import ProductOptions from '../components/ProductOptions'
import ProductVariantSelect from '../components/ProductVariantSelect'
import CartFlyout from '../components/CartFlyout'
import CartFlyoutItem from '../components/CartFlyoutItem'

import defaultMultivariate from '../../config/defaults/multivariateProduct'

storiesOf('Components | Product/Composition', module)
  .addDecorator(withInfo)
  .add(
    'PDP',
    () => ({
      components: {
        ProductPrice,
        ProductTitle,
        ProductDescription,
        ProductCategory,
        ProductImage,
        ProductAddToCartButton,
        ProductQuantityUpdate,
        ProductOptions,
        ProductVariantSelect,
        CartFlyout,
        CartFlyoutItem
      },
      store,
      data() {
        return {
          product: defaultMultivariate,
          variant: defaultMultivariate.variants[0]
        }
      },
      methods: {
        onVariantSelect ({ options, selectedVariant }) {
          this.variant = selectedVariant
        }
      },

      template: `
      <section class="section">
        <div class="container is-marginless is-paddingless">
          <div class="columns">
            <div class="column is-6">
              <product-image :source="product.featuredMedia.src"/>
            </div>
            <div class="column is-6">
              <product-title :title="product.title"/>
              <product-category :category="product.category"/>
              <product-description :description="product.description"/>
              <product-price :price="variant.price"></product-price>
              <div class="columns is-marginless is-paddingless">
                <product-variant-select
                  :product="product"
                  :variant="variant"
                  v-on:variant-selected="onVariantSelect"
                />
              </div>
            </div>
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
