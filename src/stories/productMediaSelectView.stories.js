/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withInfo } from 'storybook-addon-vue-info'

import ProductMediaSelectView from '../components/ProductMediaSelectView'

storiesOf('Components | Product', module)
  .addDecorator(withInfo)
  .add(
    'Media Select View',
    () => ({
      components: { ProductMediaSelectView },
      template:
        '<product-media-select-view :media="media" :featured-media="featuredMedia"/>',
      data() {
        return {
          media: [
            {
              source:
                'https://nacelle-assets.s3-us-west-2.amazonaws.com/Pexels+Videos+1333384.mp4',
              type: 'video'
            },
            { source: 'https://picsum.photos/id/980/500/500', type: 'image' },
            { source: 'https://picsum.photos/id/585/500/500', type: 'image' },
            { source: 'https://picsum.photos/id/576/500/500', type: 'image' },
            { source: 'https://picsum.photos/id/52/500/500', type: 'image' }
          ],
          featuredMedia: {
            source: 'https://picsum.photos/id/960/500/500',
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
