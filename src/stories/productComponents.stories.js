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
        ProductAddToCartButton
      },
      store,
      data() {
        return {
          price: '29.99',
          title: 'Awesome T-Shirt',
          category: "Men's Shirts",
          image: {
            source:
              'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
          },
          description:
            "<p>This is the t-shirt description. It's a really nice item, isn't it? You can buy it in different colors and sizes.</p>",
          productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
          handle: 'gray-t-shirt',
          variant: {}
        }
      },
      template: `
      <section class="section">
      <div class="container is-marginless is-paddingless">
      <div class="columns">
      <div class="column is-6">
        <product-image :source="image.source"/>
      </div>
            <div class="column is-6">
        <product-title :title="title"/>
        <product-category :category="category"/>
        <product-description :description="description"/>
        <product-price :price="price"></product-price>
        <product-add-to-cart-button :image="image" :title="title" :productId="productId" :handle="handle" :variant="variant"/>
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
