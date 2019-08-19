import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart'
import menu from './menu'
import modal from './modal'
import events from './events'
import product from './product'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    cart: cart(),
    menu: menu,
    modal: modal,
    events: events,
    product: product
  }
})

export default store
