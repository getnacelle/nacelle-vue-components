import Vue from 'vue'
import Vuex from 'vuex'
import test from './test'
import cart from './cart'
import menu from './menu'
import modal from './modal'
import product from './product'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    test: test,
    cart: cart(),
    menu: menu,
    modal: modal,
    product: product
  }
})

export default store
