import cart from './cart'
import menu from './menu'
import modal from './modal'
import events from './events'
import product from './product'
import user from './user'

export default function createStoreConfig() {
  return {
    modules: {
      cart: cart(),
      menu,
      modal,
      events,
      product,
      user
    }
  }
}
