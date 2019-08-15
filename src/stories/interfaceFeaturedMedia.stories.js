/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-vue-router'

import InterfaceFeaturedMedia from '../components/InterfaceFeaturedMedia'

storiesOf('Components | General', module)
  .addDecorator(withInfo)
  .addDecorator(StoryRouter())
  .add(
    'Featured Media',
    () => ({
      components: { InterfaceFeaturedMedia },
      data() {
        return {
          media: {
            src: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg',
            type: 'image/jpeg'
          }
        }
      },
      template: `
        <interface-featured-media :media="media" />
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
