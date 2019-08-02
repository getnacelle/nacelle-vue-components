/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withKnobs, object } from '@storybook/addon-knobs'
import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-vue-router'

import store from '../store/store'
import ProductCard from '../components/ProductCard'
import { defaultProduct } from '../../config/defaultObjects.js'
import { mapState, mapMutations } from 'vuex'

storiesOf('Components | Product / Product Card', module)
  .addDecorator(withInfo)
  .addDecorator(StoryRouter())
  .addDecorator(() => {
    return {
      template: `
        <div style="max-width: 450px; margin: 3rem auto;"><story/></div>
      `
    }
  })
  .add(
    'Default',
    () => ({
      components: { ProductCard },
      store,
      template: '<product-card />'
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )

storiesOf('Components | Product / Product Card', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .addDecorator(() => {
    return {
      template: `
        <div style="max-width: 450px; margin: 3rem auto;"><story/></div>
      `
    }
  })
  .add(
    'With Sample Data',
    () => ({
      components: { ProductCard },
      store,
      data() {
        return {
          product: defaultProduct,
          variant: null
        }
      },
      computed: {
        ...mapState('product', ['selectedOptions'])
      },
      watch: {
        selectedOptions(val) {
          if (val.length > 0) {
            console.log('hi')
            this.setSelectedVariant()
          }
        },
        variant(val) {
          if (val != null) {
            this.setVariant(this.variant)
          }
        }
      },
      methods: {
        ...mapMutations('product', ['setVariant']),
        setSelectedVariant() {
          let variant
          if (
            this.selectedOptions.filter(option => {
              return option.value == 'Small'
            }).length == 1
          ) {
            variant = {
              id:
                'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ==',
              price: '29.99',
              title: 'Small'
            }
          } else {
            variant = {
              id:
                'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQaMQ==',
              price: '29.99',
              title: 'Medium'
            }
          }

          setTimeout(() => {
            this.variant = variant
          }, 400)
        }
      },
      template: '<product-card :product="product" :variant="variant"/>'
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
