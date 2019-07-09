import Vue from 'vue'
import Vuex from 'vuex'
import test from './test'
import cart from './cart'
import menu from './menu'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    test: test,
    cart: cart,
    menu: menu
  }
})

export default store
