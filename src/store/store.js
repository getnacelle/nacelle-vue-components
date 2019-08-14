import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
import test from './test'
import cart from './cart'
import menu from './menu'
import modal from './modal'
import events from './events'
import product from './product'

Vue.use(Vuex)
Vue.use(VueCookies)

const store = new Vuex.Store({
  modules: {
    test: test,
    cart: cart(),
    menu: menu,
    modal: modal,
    events: events,
    product: product
  }
})

export default store
