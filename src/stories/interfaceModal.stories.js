/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import InterfaceModal from '../components/InterfaceModal'
import store from '../store/store'

storiesOf('Components | General', module)
  .addDecorator(withInfo)
  .addDecorator(() => {
    return {
      template: '<div style="padding: 3rem;"><story/></div>'
    }
  })
  .add(
    'Modal',
    () => ({
      store,
      components: { InterfaceModal },
      template: `
        <interface-modal :modalOpen="true"/>
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
