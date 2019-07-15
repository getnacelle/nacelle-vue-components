/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withKnobs, object } from '@storybook/addon-knobs'
import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-vue-router'

import store from '../store/store'
import ProductCard from '../components/ProductCard'
import { defaultProduct } from '../../config/defaultObjects.js'

storiesOf('Components | Product / Product Card', module)
  .addDecorator(withInfo)
  .addDecorator(StoryRouter())
  .addDecorator(() => {
    return {
      template: `
        <div style="max-width: 450px; margin: 3rem auto;"><story/></div>
      `
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
      `
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
      template:
        '<product-card :product="product" showQuantityUpdate="false" showAddToCart="false"/>'
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
