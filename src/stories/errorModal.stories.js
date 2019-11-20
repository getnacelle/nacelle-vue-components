/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs, button } from '@storybook/addon-knobs'
import ErrorModal from '../components/ErrorModal'
import store from '../store/store'

const label = 'Trigger Error'

storiesOf('Components | General', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(() => ({
    template: '<div style="padding: 3rem;"><story/></div>'
  }))
  .add(
    'Error Modal',
    () => ({
      store,
      components: { ErrorModal },
      template: `
        <error-modal/>
      `,
      created () {
        button(label, () => {
          store.commit('cart/setCartError', 'this is an error')
        })
      }
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
