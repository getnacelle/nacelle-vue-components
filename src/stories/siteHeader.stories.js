/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-vue-router'
import store from '../store/store'

import SiteHeader from '../components/SiteHeader'

storiesOf('Components | Site Header', module)
  .addDecorator(withInfo)
  .addDecorator(StoryRouter())
  .addDecorator(() => {
    return {
      template: '<div style="height: 1600px;"><story/></div>',
    }
  })
  .add(
    'Default',
    () => ({
      store,
      components: { SiteHeader },
      mounted() {
        store.dispatch('cart/addLineItem', {
          image: {
            thumbnailSrc:
              'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
          },
          title: 'Gray T-Shirt',
          productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
          handle: 'gray-t-shirt',

          quantity: 1,
          variant: {
            id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDIyMDAwOQ==',
            title: 'Cool Version',
            price: '29.99'
          }
        })
      },
      template: `
        <site-header>
          <template v-slot:menu>
            <router-link class="main-nav-item" :to="'/shop'">Shop</router-link>
          </template>
          <template v-slot:flyout-menu>
            <router-link class="main-nav-item" :to="'/shop'">Shop</router-link>
          </template>
        </site-header>
      `
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
