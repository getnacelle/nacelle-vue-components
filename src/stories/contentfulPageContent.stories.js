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
      id: "1kmqDdWDL4rJQ4wIaAFcZm",
      title: "The future of furniture",
      handle: "the-future-of-furniture",
      contentHtml: null,
      tags: null,
      featuredMedia: {
        id: "4ykTjR1fM1563524AIRvq2",
        src:
          "https://images.ctfassets.net/9n7z3zrrmdu4/4ykTjR1fM1563524AIRvq2/59e172a7ab0783ea77a792dcef6faf39/iStock-476157466.jpg",
        thumbnailSrc:
          "https://images.ctfassets.net/9n7z3zrrmdu4/4ykTjR1fM1563524AIRvq2/59e172a7ab0783ea77a792dcef6faf39/iStock-476157466.jpg"
      },
      fields: {
        contentType: "ContentHeroBanner",
        subtitle: "Testing",
        content: {
          data: {},
          content: [
            {
              data: {},
              content: [{ data: {}, marks: [], value: "Test", nodeType: "text" }],
              nodeType: "paragraph"
            }
          ],
          nodeType: "document"
        },
        alignment: "center",
        size: "medium",
        mobileFullHeight: false,
        mobileBackgroundImage: {
          sys: {
            space: {
              sys: { type: "Link", linkType: "Space", id: "9n7z3zrrmdu4" }
            },
            id: "2mri2qBxe39mYOENoIIHTx",
            type: "Asset",
            createdAt: "2019-08-12T23:34:26.211Z",
            updatedAt: "2019-08-12T23:34:26.211Z",
            environment: {
              sys: { id: "master", type: "Link", linkType: "Environment" }
            },
            revision: 1,
            locale: "en-US"
          },
          fields: {
            title: "demo-photo1",
            file: {
              url:
                "//images.ctfassets.net/9n7z3zrrmdu4/2mri2qBxe39mYOENoIIHTx/5a453f3dabec858c0090f09b746df307/demo-photo1.jpeg",
              details: { size: 124110, image: { width: 1200, height: 700 } },
              fileName: "demo-photo1.jpeg",
              contentType: "image/jpeg"
            }
          }
        },
        ctaText: "Shop Now",
        ctaUrl: "/shop"
      }
    },
    {
      id: "7p0xQtA9OQu1RoUvcsGV02",
      title: "New Arrivals",
      handle: "new-arrivals",
      contentHtml: null,
      tags: null,
      featuredMedia: null,
      fields: { contentType: "ContentProductGrid", columns: 4 }
    },
    {
      id: "5kbOHEVaQHIbKdiFH7zi2t",
      title: "Modern Styles",
      handle: "modern-styles",
      contentHtml: null,
      tags: null,
      featuredMedia: {
        id: "5YSVUJO2PAFG8lvvCOg1Jd",
        src:
          "https://images.ctfassets.net/9n7z3zrrmdu4/5YSVUJO2PAFG8lvvCOg1Jd/335b6e906be4e5638dc597c41033e4e3/demo-photo3.jpeg",
        thumbnailSrc:
          "https://images.ctfassets.net/9n7z3zrrmdu4/5YSVUJO2PAFG8lvvCOg1Jd/335b6e906be4e5638dc597c41033e4e3/demo-photo3.jpeg"
      },
      fields: {
        contentType: "ContentSideBySide",
        content: {
          data: {},
          content: [
            {
              data: {},
              content: [
                {
                  data: {},
                  marks: [],
                  value:
                    "Run a manual sweep of anomalous airborne or electromagnetic readings. Radiation levels in our atmosphere have increased by 3,000 percent.",
                  nodeType: "text"
                }
              ],
              nodeType: "paragraph"
            }
          ],
          nodeType: "document"
        },
        backgroundColor: "#f2eee8",
        ctaText: "Shop Now",
        ctaUrl: "/shop",
        reverseDesktop: true,
        reverseMobile: false
      }
    },
    {
      id: "3p4NbUVGpD9Daj5RVGcLbB",
      title: "What People Are Saying",
      handle: "what-people-are-saying",
      contentHtml: null,
      tags: null,
      featuredMedia: null,
      fields: {
        contentType: "ContentTestimonials",
        slidesPerView: 2,
        alignment: "left",
        slides: [
          {
            sys: {
              space: {
                sys: { type: "Link", linkType: "Space", id: "9n7z3zrrmdu4" }
              },
              id: "5WvwvfE40tdGfCqVATxW5s",
              type: "Entry",
              createdAt: "2019-08-14T18:15:18.932Z",
              updatedAt: "2019-08-14T18:15:18.932Z",
              environment: {
                sys: { id: "master", type: "Link", linkType: "Environment" }
              },
              revision: 1,
              contentType: {
                sys: { type: "Link", linkType: "ContentType", id: "testimonial" }
              },
              locale: "en-US"
            },
            fields: {
              name: "@john-doe",
              quotation:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum metus a vulputate viverra. Sed vel varius libero, id luctus sem.",
              featuredMedia: {
                sys: {
                  space: {
                    sys: { type: "Link", linkType: "Space", id: "9n7z3zrrmdu4" }
                  },
                  id: "1KsG8pQDYVLqlHdVl0XSF8",
                  type: "Asset",
                  createdAt: "2019-08-14T18:15:14.068Z",
                  updatedAt: "2019-08-14T18:15:14.068Z",
                  environment: {
                    sys: { id: "master", type: "Link", linkType: "Environment" }
                  },
                  revision: 1,
                  locale: "en-US"
                },
                fields: {
                  title: "300x300",
                  file: {
                    url:
                      "//images.ctfassets.net/9n7z3zrrmdu4/1KsG8pQDYVLqlHdVl0XSF8/05b9cffbeb36a7de9da5d31e0fbb7aea/300x300.png",
                    details: { size: 1132, image: { width: 300, height: 300 } },
                    fileName: "300x300.png",
                    contentType: "image/png"
                  }
                }
              }
            }
          },
          {
            sys: {
              space: {
                sys: { type: "Link", linkType: "Space", id: "9n7z3zrrmdu4" }
              },
              id: "2lbCIItVi4jNm9GEQlapx1",
              type: "Entry",
              createdAt: "2019-08-14T18:16:16.531Z",
              updatedAt: "2019-08-14T18:16:16.531Z",
              environment: {
                sys: { id: "master", type: "Link", linkType: "Environment" }
              },
              revision: 1,
              contentType: {
                sys: { type: "Link", linkType: "ContentType", id: "testimonial" }
              },
              locale: "en-US"
            },
            fields: {
              name: "@the-fourth-user",
              quotation:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum metus a vulputate viverra. Sed vel varius libero, id luctus sem.",
              featuredMedia: {
                sys: {
                  space: {
                    sys: { type: "Link", linkType: "Space", id: "9n7z3zrrmdu4" }
                  },
                  id: "1KsG8pQDYVLqlHdVl0XSF8",
                  type: "Asset",
                  createdAt: "2019-08-14T18:15:14.068Z",
                  updatedAt: "2019-08-14T18:15:14.068Z",
                  environment: {
                    sys: { id: "master", type: "Link", linkType: "Environment" }
                  },
                  revision: 1,
                  locale: "en-US"
                },
                fields: {
                  title: "300x300",
                  file: {
                    url:
                      "//images.ctfassets.net/9n7z3zrrmdu4/1KsG8pQDYVLqlHdVl0XSF8/05b9cffbeb36a7de9da5d31e0fbb7aea/300x300.png",
                    details: { size: 1132, image: { width: 300, height: 300 } },
                    fileName: "300x300.png",
                    contentType: "image/png"
                  }
                }
              }
            }
          },
          {
            sys: {
              space: {
                sys: { type: "Link", linkType: "Space", id: "9n7z3zrrmdu4" }
              },
              id: "6A0xqQ98vta3bbXwr4nz6P",
              type: "Entry",
              createdAt: "2019-08-14T18:16:01.022Z",
              updatedAt: "2019-08-14T18:16:01.022Z",
              environment: {
                sys: { id: "master", type: "Link", linkType: "Environment" }
              },
              revision: 1,
              contentType: {
                sys: { type: "Link", linkType: "ContentType", id: "testimonial" }
              },
              locale: "en-US"
            },
            fields: {
              name: "@third-user-name",
              quotation:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum metus a vulputate viverra. Sed vel varius libero, id luctus sem.",
              featuredMedia: {
                sys: {
                  space: {
                    sys: { type: "Link", linkType: "Space", id: "9n7z3zrrmdu4" }
                  },
                  id: "1KsG8pQDYVLqlHdVl0XSF8",
                  type: "Asset",
                  createdAt: "2019-08-14T18:15:14.068Z",
                  updatedAt: "2019-08-14T18:15:14.068Z",
                  environment: {
                    sys: { id: "master", type: "Link", linkType: "Environment" }
                  },
                  revision: 1,
                  locale: "en-US"
                },
                fields: {
                  title: "300x300",
                  file: {
                    url:
                      "//images.ctfassets.net/9n7z3zrrmdu4/1KsG8pQDYVLqlHdVl0XSF8/05b9cffbeb36a7de9da5d31e0fbb7aea/300x300.png",
                    details: { size: 1132, image: { width: 300, height: 300 } },
                    fileName: "300x300.png",
                    contentType: "image/png"
                  }
                }
              }
            }
          },
          {
            sys: {
              space: {
                sys: { type: "Link", linkType: "Space", id: "9n7z3zrrmdu4" }
              },
              id: "4CwmZ0Yf4cDszz7kfAt739",
              type: "Entry",
              createdAt: "2019-08-14T18:15:41.499Z",
              updatedAt: "2019-08-14T18:15:41.499Z",
              environment: {
                sys: { id: "master", type: "Link", linkType: "Environment" }
              },
              revision: 1,
              contentType: {
                sys: { type: "Link", linkType: "ContentType", id: "testimonial" }
              },
              locale: "en-US"
            },
            fields: {
              name: "@user-two",
              quotation:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum metus a vulputate viverra. Sed vel varius libero, id luctus sem.",
              featuredMedia: {
                sys: {
                  space: {
                    sys: { type: "Link", linkType: "Space", id: "9n7z3zrrmdu4" }
                  },
                  id: "1KsG8pQDYVLqlHdVl0XSF8",
                  type: "Asset",
                  createdAt: "2019-08-14T18:15:14.068Z",
                  updatedAt: "2019-08-14T18:15:14.068Z",
                  environment: {
                    sys: { id: "master", type: "Link", linkType: "Environment" }
                  },
                  revision: 1,
                  locale: "en-US"
                },
                fields: {
                  title: "300x300",
                  file: {
                    url:
                      "//images.ctfassets.net/9n7z3zrrmdu4/1KsG8pQDYVLqlHdVl0XSF8/05b9cffbeb36a7de9da5d31e0fbb7aea/300x300.png",
                    details: { size: 1132, image: { width: 300, height: 300 } },
                    fileName: "300x300.png",
                    contentType: "image/png"
                  }
                }
              }
            }
          }
        ]
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
      props: {
        contentfulData: {
          default: object('Contentful Data', defaultObj)
        }
      },
      data() {
        return {
          products: productArray
        }
      },
      template: `<contentful-page-content :content="contentfulData.content" :products="products" />`
    })
  )
