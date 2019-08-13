/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios'
import { storiesOf } from '@storybook/vue'
import { withKnobs, object } from '@storybook/addon-knobs';
import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-vue-router'

import ContentfulPageContent from '../components/ContentfulPageContent'

import store from '../store/store'
import { defaultProduct } from '../../config/defaultObjects.js'

const productArray = [
  defaultProduct,
  defaultProduct,
  defaultProduct,
  defaultProduct,
  defaultProduct,
  defaultProduct
]

const defaultObj = {
  "content": [
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
        "src": "https://source.unsplash.com/1400x600"
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

storiesOf('Components | Content / Contentful Page Content', module)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .add(
    'Example',
    () => ({
      components: { ContentfulPageContent },
      store,
      data() {
        return {
          content: [],
          products: productArray
        }
      },
      mounted() {
        const graphql = 'https://hailfrequency.com/graphql/v1/space/4e90c9df-9e0d-4632-8ec4-1d31112c7648'
        const query = `
          query {
            getBlogByHandle(handle: "homepage") {
              id
              handle
              source
              title
              articles {
                edges {
                  node {
                    id
                    title
                    handle
                    contentHtml
                    tags
                    featuredMedia {
                      id
                      src
                      thumbnailSrc
                    }
                    fields
                  }
                }
              }
            }
          }
        `

        axios({
          method: 'post',
          url: graphql,
          data: { query },
          headers: {
            'Content-Type': 'application/graphql',
            'x-nacelle-token': '1b74853f-692e-4670-951a-253c78600298'
          }
        })
        .then(res => {
          if (res && res.data) {
            const page = res.data.data.getBlogByHandle
            const articles = page.articles.edges.map(edge => edge.node)
            console.log(articles)
            this.content = articles
            // this.content = page.articles.edges.map(edge => {
            //   if (edge.cursor) {
            //     edge.node.cursor = edge.cursor
            //   }
        
            //   return edge.node
            // })
          }
        })
        .catch(err => {
          const { response } = err
          const { request, ...errorObject } = response

          if (errorObject) {
            console.error(errorObject)
          } else {
            console.error(err)
          }
        })
      },
      template: `<contentful-page-content :content="content" :products="products" />`
    })
  )

// storiesOf('Components | Content / Contentful Page Content', module)
//   .addDecorator(withKnobs)
//   .addDecorator(StoryRouter())
//   .add(
//     'Custom',
//     () => ({
//       components: { ShopifyPageContent },
//       store,
//       props: {
//         shopifyData: {
//           default: object('Shopify Data', defaultObj)
//         }
//       },
//       data() {
//         return {
//           products: productArray
//         }
//       },
//       template: `
//         <shopify-page-content :content="shopifyData.content" :products="products">
//           <template v-slot:default="slotProps">
//             <div v-for="section in slotProps.content">
//               {{ section.title }}
//             </div>
//           </template>
//         </shopify-page-content>
//       `
//     })
//   )
