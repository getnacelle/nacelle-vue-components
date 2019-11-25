/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-vue-router'

import InterfaceLogo from '../components/InterfaceLogo'

storiesOf('Components | General', module)
  .addDecorator(withInfo)
  .addDecorator(StoryRouter())
  .add(
    'Logo',
    () => ({
      components: { InterfaceLogo },
      data() {
        return {
          src:
            'https://nacelle-assets.s3-us-west-2.amazonaws.com/nacelle-logo-dark.png'
        }
      },
      template: `<interface-logo :src='src'
      />`
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
