import Vue from 'vue'
import Vuex from 'vuex'
import test from './test'
import cart from './cart'
import menu from './menu'
import modal from './modal'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    test: test,
    cart: cart(),
    menu: menu,
    modal: modal
  }
})

export default store
