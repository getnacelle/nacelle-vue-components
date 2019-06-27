import Vue from 'vue'
import Vuex from 'vuex'
import test from './test'
import cart from './cart'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    test: test,
    cart: cart
  }
})

export default store
