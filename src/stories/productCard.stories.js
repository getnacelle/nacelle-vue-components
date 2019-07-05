/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withKnobs, object } from '@storybook/addon-knobs';
import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-vue-router'

import store from '../store/store'

import ProductCard from '../components/ProductCard'

const defaultProduct = {
  price: {
    max:'29.99'
  },
  title: 'Awesome T-Shirt',
  category: "Men's Shirts",
  featuredMedia: {
    src:
      'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
  },
  description:
    "<p>This is the t-shirt description. It's a really nice item, isn't it? You can buy it in different colors and sizes.</p>",
  productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
  handle: 'gray-t-shirt',
  variant: {
    id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
  }
}

storiesOf('Components | Product / Product Card', module)
  .addDecorator(withInfo)
  .addDecorator(StoryRouter())
  .addDecorator(() => {
    return {
      template: `
        <div style="max-width: 450px; margin: 3rem auto;"><story/></div>
      `,
    }
  })
  .add(
    'Default',
    () => ({
      components: { ProductCard },
      store,
      template: '<product-card />'
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )

storiesOf('Components | Product / Product Card', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .addDecorator(() => {
    return {
      template: `
        <div style="max-width: 450px; margin: 3rem auto;"><story/></div>
      `,
    }
  })
  .add(
    'With Sample Data',
    () => ({
      components: { ProductCard },
      store,
      props: {
        product: {
          default: object('Product Object', defaultProduct)
        }
      },
      template: '<product-card :product="product" />'
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
