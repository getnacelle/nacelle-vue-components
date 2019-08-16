/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs, text, boolean, array, select } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-vue-router'

import BlogArticlePreview from '../components/BlogArticlePreview'

const mediaTypeOptions = {
  Image: 'image',
  Video: 'video'
}

storiesOf('Components | Content / Blog / Article Preview', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .addDecorator(() => {
    return {
      template: '<div style="padding: 3rem;"><story/></div>'
    }
  })
  .add(
    'Default',
    () => ({
      components: { BlogArticlePreview },
      props: {
        isFeatured: {
          default: boolean('Is Featured', false)
        },
        title: {
          default: text('Title', 'Article Preview Title')
        },
        handle: {
          default: text('Handle', 'article-preview-title')
        },
        excerpt: {
          default: text(
            'Excerpt',
            'He has this ability of instantly interpreting and extrapolating any verbal communication he hears. It may be due to the envelope over the structure, causing hydrogen-carbon helix patterns throughout.'
          )
        },
        tags: {
          default: array('Tags', [])
        },
        mediaSrc: {
          default: text(
            'Media Src',
            'https://nacelle-assets.s3-us-west-2.amazonaws.com/article-featured-media.jpeg'
          )
        },
        mediaType: {
          default: select('Media Type', mediaTypeOptions, 'image')
        }
      },
      computed: {
        featuredMedia() {
          return {
            src: this.mediaSrc,
            type: this.mediaType
          }
        },
        wrapperStyle() {
          if (!this.isFeatured) {
            return 'max-width: 400px'
          }

          return ''
        }
      },
      template: `
      <div :style="wrapperStyle">
        <blog-article-preview
          :title="title"
          :handle="handle"
          :excerpt="excerpt"
          :tags="tags"
          :featured-media="featuredMedia"
          :is-featured="isFeatured"
        />
      </div>
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
