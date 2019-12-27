/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
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
