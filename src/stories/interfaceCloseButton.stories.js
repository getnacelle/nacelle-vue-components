/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withInfo } from 'storybook-addon-vue-info'

import InterfaceCloseButton from '../components/InterfaceCloseButton'

storiesOf('Components | General', module)
  .addDecorator(withInfo)
  .addDecorator(() => {
    return {
      template: '<div style="padding: 3rem;"><story/></div>'
    }
  })
  .add(
    'Close Button',
    () => ({
      components: { InterfaceCloseButton },
      template: `
        <interface-close-button/>
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
