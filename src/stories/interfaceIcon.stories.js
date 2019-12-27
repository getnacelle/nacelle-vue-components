/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import StoryRouter from 'storybook-vue-router'
import store from '../store/store'

import InterfaceIcon from '../components/InterfaceIcon'

storiesOf('Components | General / Icon', module)
  .addDecorator(withInfo)
  .addDecorator(StoryRouter())
  .add(
    'Wishlist',
    () => ({
      store,
      components: { InterfaceIcon },
      data() {
        return {
          iconName: 'wishlist',
          path: '/wishlist'
        }
      },
      template: '<interface-icon :iconName="iconName" :path="path"/>'
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )

storiesOf('Components | General / Icon', module)
  .addDecorator(withInfo)
  .addDecorator(StoryRouter())
  .add(
    'Account',
    () => ({
      store,
      components: { InterfaceIcon },
      data() {
        return {
          iconName: 'account',
          path: '/account'
        }
      },
      template: '<interface-icon :iconName="iconName" :path="path"/>'
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )

storiesOf('Components | General / Icon', module)
  .addDecorator(withInfo)
  .addDecorator(StoryRouter())
  .add(
    'Cart',
    () => ({
      store,
      components: { InterfaceIcon },
      data() {
        return {
          iconName: 'cart',
          iconAction: 'cart/showCart'
        }
      },
      template: '<interface-icon :iconName="iconName" :iconAction="iconAction"/>'
    }),
    {
      info: {
        // summary: "Hello"
      }
    }
  )
