/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'

import ProductMediaSelectView from '../components/ProductMediaSelectView'

storiesOf('Components | Product', module)
  .addDecorator(withInfo)
  .add(
    'Media Select View',
    () => ({
      components: { ProductMediaSelectView },
      template: `<div class="section">
        <div class="columns">
        <div class="column is-6">
          <product-media-select-view :media="media" :featured-media="featuredMedia"/>
          </div>
          </div>
        </div>`,
      data() {
        return {
          media: [
            {
              src: 'https://picsum.photos/id/52/500/500',
              type: 'image',
              thumbnailSrc: 'https://picsum.photos/id/52/500/500'
            },
            { src: 'https://picsum.photos/id/980/500/500', type: 'image' },
            { src: 'https://picsum.photos/id/585/500/500', type: 'image' },
            { src: 'https://picsum.photos/id/576/500/500', type: 'image' },
            { src: 'https://picsum.photos/id/52/500/500', type: 'image' }
          ],
          featuredMedia: {
            src: 'https://picsum.photos/id/960/500/500',
            type: 'image'
          }
        }
      }
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
