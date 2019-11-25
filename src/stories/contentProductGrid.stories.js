import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-vue-router'

import ContentProductGrid from '../components/ContentProductGrid'

import store from '../store/store'

// const defaultProduct = {
//   priceRange: {
//     max:'29.99'
//   },
//   title: 'Awesome T-Shirt',
//   category: "Men's Shirts",
//   featuredMedia: {
//     src:
//       'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
//   },
//   description:
//     "<p>This is the t-shirt description. It's a really nice item, isn't it? You can buy it in different colors and sizes.</p>",
//   id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
//   handle: 'gray-t-shirt',
//   variants: [{
//     id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
//   }]
// }
import { defaultProduct } from '../../config/defaultObjects'

const productArray = [defaultProduct, defaultProduct, defaultProduct]

storiesOf('Components | Content / Product Grid', module)
  .addDecorator(withInfo)
  .addDecorator(StoryRouter())
  .addDecorator(() => {
    return {
      template: `
        <div style="padding: 3rem;"><story/></div>
      `
    }
  })
  .add(
    'Default',
    () => ({
      components: { ContentProductGrid },
      store,
      data() {
        return {
          title: 'Product Grid',
          products: productArray
        }
      },
      template: '<content-product-grid :title="title" :products="products" />'
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )

storiesOf('Components | Content / Product Grid', module)
  .addDecorator(withInfo)
  .addDecorator(StoryRouter())
  .addDecorator(() => {
    return {
      template: `
        <div style="padding: 3rem;"><story/></div>
      `
    }
  })
  .add(
    'Custom Slots',
    () => ({
      components: { ContentProductGrid },
      store,
      data() {
        return {
          title: 'Product Grid',
          products: productArray
        }
      },
      template: `
        <content-product-grid :title="title" :products="products">
          <template v-slot:header>
            <h1 style="font-size: 3em; margin-bottom: 1em">Custom Header</h1>
          </template>
          <template v-slot:products="{ products }">
            <ul>
              <li v-for="product in products" :key="product.id">
                {{ product.title }}
              </li>
            </ul>
          </template>
        </content-product-grid>
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
