/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'

import CtaButton from '../components/CtaButton'

storiesOf('Components | General', module)
  .addDecorator(withInfo)
  .addDecorator(() => {
    return {
      template: '<div style="padding: 3rem;"><story/></div>'
    }
  })
  .add(
    'CTA Button',
    () => ({
      components: { CtaButton },
      data() {
        return {
          to: 'http://www.google.com'
        }
      },
      template: `
        <cta-button :to="to">
          CTA Button
        </cta-button>
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
