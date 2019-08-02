import { storiesOf } from '@storybook/vue'
import { withKnobs, object } from '@storybook/addon-knobs'
import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-vue-router'

import ProductGrid from '../components/ProductGrid'
import InterfaceModal from '../components/InterfaceModal'
import store from '../store/store'

import { defaultProduct, defaultProduct2 } from '../../config/defaultObjects.js'

const productArray = [
  defaultProduct,
  defaultProduct2
  // defaultProduct,
  // defaultProduct,
  // defaultProduct,
  // defaultProduct
]

storiesOf('Components | Product / Composition', module)
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
    'Product Grid',
    () => ({
      components: { ProductGrid, InterfaceModal },
      store,
      data() {
        return {
          title: 'Product Grid',
          products: productArray
        }
      },
      template: `<div>
      <interface-modal/>
      <product-grid :products="products" :showAddToCart="true" :showQuantityUpdate="true"/>
      </div>`
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
