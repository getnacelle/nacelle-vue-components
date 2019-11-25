/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs } from '@storybook/addon-knobs'
import StoryRouter from 'storybook-vue-router'
import store from '../store/store'
import { defaultProduct } from '../../config/defaultObjects.js'
import ProductShopLook from '../components/ProductShopLook'

storiesOf('Components | Product ', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .addDecorator(() => {
    return {
      template:
        '<div style="padding: 3rem; max-width: 600px; margin: 0 auto;"><story/></div>'
    }
  })
  .add(
    'Shop Look',
    () => ({
      components: { ProductShopLook },
      store,
      data() {
        return {
          image:
            'https://nacelle-assets.s3-us-west-2.amazonaws.com/article-featured-media.jpeg',
          products: [defaultProduct]
        }
      },
      template: `
        <product-shop-look
          :image-src="image"
          :products="products"
        />
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
