import { storiesOf } from '@storybook/vue'
import { withKnobs, object } from '@storybook/addon-knobs';
import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-vue-router'

import ContentProductGrid from '../components/ContentProductGrid'

import store from '../store/store'

const defaultProduct = {
  priceRange: {
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
  variants: [{
    id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
  }]
}

const productArray = [
  defaultProduct,
  defaultProduct,
  defaultProduct,
  defaultProduct,
  defaultProduct,
  defaultProduct
]

storiesOf('Components | Content', module)
  .addDecorator(withInfo)
  .addDecorator(StoryRouter())
  .addDecorator(() => {
    return {
      template: `
        <div style="padding: 3rem;"><story/></div>
      `,
    }
  })
  .add(
    'Product Grid',
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
