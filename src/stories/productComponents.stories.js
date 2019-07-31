/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
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

import { defaultProduct } from '../../config/defaultObjects.js'

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
        ProductVariantSelect
      },
      store,
      data() {
        return {
          product: defaultProduct,
          optionsSelection: null,
          variant: null
        }
      },
      computed: {
        currentVariant() {
          if (this.variant != null) {
            return this.variant
          } else {
            return this.product.variants[0]
          }
        }
      },
      watch: {
        optionsSelection() {
          this.setSelectedVariant()
        }
      },
      
      methods: {
        setSelectedVariant() {
          let variant = {
            id: `${Math.random()}`,
            price: '29.99',
            title: `Variant ${Math.random()}`
          }
          this.variant = variant
        },
        captureOptions(val) {
          this.optionsSelection = val
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
        <product-price :price="currentVariant.price"></product-price>
        <div class="columns is-marginless is-paddingless">
      <product-variant-select :product="product" :variant="currentVariant" v-on:selectedOptions="captureOptions"/>
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
