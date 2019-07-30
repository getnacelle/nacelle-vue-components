/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import store from '../store/store'
import ProductOptions from '../components/ProductOptions'

storiesOf('Components | Product', module)
  .addDecorator(withInfo)
  .add(
    'Options',
    () => ({
      components: { ProductOptions },
      store,
      data() {
        return {
          // options: [
          //   {
          //     name: 'Size',
          //     values: ['xs', 'small', 'medium', 'large', 'xl', 'xxl']
          //   },
          //   {
          //     name: 'Shape',
          //     values: ['Oval', 'Triangle', 'Square']
          //   },
          //   {
          //     name: 'Color',
          //     values: ['white', 'red', 'blue']
          //   }
          // ]
        }
      },
      template: '<product-options style="width:500px" :options="options"/>'
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
