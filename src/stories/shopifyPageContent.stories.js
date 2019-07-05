/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withKnobs, object } from '@storybook/addon-knobs';
import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-vue-router'

import ShopifyPageContent from '../components/ShopifyPageContent'

import store from '../store/store'

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

const productArray = [
  defaultProduct,
  defaultProduct,
  defaultProduct,
  defaultProduct,
  defaultProduct,
  defaultProduct
]

const defaultObj = {
  content: [
    {
      "id": "Z2lkOi8vc2hvcGlmeS9BcnRpY2xlLzI5ODgzMDcyNjE3",
      "handle": "hero-banner",
      "source": "shopify",
      "title": "Hero Banner",
      "description": null,
      "tags": [
        "field::contentType::ContentHeroBanner",
        "field::ctaText::Button Text",
        "field::ctaUrl::/shop"
      ],
      "featuredMedia": {
        "id": "Z2lkOi8vc2hvcGlmeS9BcnRpY2xlSW1hZ2UvODcwODY4NTkyOQ==",
        "type": "image",
        "src": "https://cdn.shopify.com/s/files/1/0248/6308/0553/articles/default-banner-img.png?v=1562087275&width=750"
      },
      "fields": {
        "content": "This is the subtitle"
      }
    },
    {
      "id": "Z2lkOi8vc2hvcGlmeS9BcnRpY2xlLzI5ODgzMjAzNjg5",
      "handle": "side-by-side",
      "source": "shopify",
      "title": "Side-by-Side",
      "description": null,
      "tags": [
        "field::backgroundColor::#ebebff",
        "field::contentType::ContentSideBySide",
        "field::ctaText::Shop Now",
        "field::ctaUrl::/shop"
      ],
      "featuredMedia": {
        "id": "Z2lkOi8vc2hvcGlmeS9BcnRpY2xlSW1hZ2UvODcwODg0OTc2OQ==",
        "type": "image",
        "src": "https://cdn.shopify.com/s/files/1/0248/6308/0553/articles/photo-1561537457-5dc4c79bc47c.jpeg?v=1562088662&width=750"
      },
      "fields": {
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
      }
    },
    {
      "id": "Z2lkOi8vc2hvcGlmeS9BcnRpY2xlLzI5ODg0Mjg1MDMz",
      "handle": "testimonials",
      "source": "shopify",
      "title": "Testimonials",
      "description": null,
      "tags": [
        "field::contentType::ContentTestimonials"
      ],
      "featuredMedia": null,
      "fields": {
        "content": ""
      }
    },
    {
      "id": "Z2lkOi8vc2hvcGlmeS9BcnRpY2xlLzI5ODg0ODQyMDg5",
      "handle": "testimonial-1",
      "source": "shopify",
      "title": "Testimonial 1",
      "description": null,
      "tags": [
        "childSection",
        "field::contentType::ContentTestimonial"
      ],
      "featuredMedia": null,
      "fields": {
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum metus a vulputate viverra. Sed vel varius libero, id luctus sem."
      }
    },
    {
      "id": "Z2lkOi8vc2hvcGlmeS9BcnRpY2xlLzI5OTAyNDcxMjcz",
      "handle": "product-grid",
      "source": "shopify",
      "title": "Product Grid",
      "description": null,
      "tags": [
        "field::contentType::ContentProductGrid"
      ],
      "featuredMedia": null,
      "fields": {
        "content": ""
      }
    }
  ]
}

storiesOf('Components | Content', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .add(
    'Shopify Page Content',
    () => ({
      components: { ShopifyPageContent },
      store,
      props: {
        shopifyData: {
          default: object('Shopify Data', defaultObj)
        }
      },
      data() {
        return {
          products: productArray
        }
      },
      template: `<shopify-page-content :content="shopifyData.content" :products="products" />`
    }),
    {
      info: {
        summary: `
          Takes Shopify content data and turns it into section blocks.
        `
      }
    }
  )
