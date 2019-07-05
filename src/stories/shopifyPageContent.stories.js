/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withKnobs, object } from '@storybook/addon-knobs';
import { withInfo } from 'storybook-addon-vue-info'

import ShopifyPageContent from '../components/ShopifyPageContent'

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
    }
  ]
}

storiesOf('Components | Content', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add(
    'Shopify Page Content',
    () => ({
      components: { ShopifyPageContent },
      props: {
        shopifyData: {
          default: object('Shopify Data', defaultObj)
        }
      },
      template: `<shopify-page-content :content="shopifyData.content" />`
    }),
    {
      info: {
        summary: `
          Takes Shopify content data and turns it into section blocks.
        `
      }
    }
  )
