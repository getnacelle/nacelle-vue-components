import uuid from 'uuidv4'

const events = {
  namespaced: true,
  state: {
    anonymousId: '',
    customerId: '',
    customerEmail: '',
    log: []
  },
  mutations: {
    addEvent(state, event) {
      state.log.push(event)
    },
    setAnonymousId(state, id) {
      state.anonymousId = id
    },
    setCustomerId(state, id) {
      state.customerId = id
    },
    customerEmail(state, email) {
      state.customerEmail = email
    }
  },
  actions: {
    pageView({ commit }, page) {
      commit('addEvent', {
        event: 'PAGE_VIEW',
        page
      })
    },
    productView({ commit }, product) {
      commit('addEvent', {
        event: 'PRODUCT_VIEW',
        product
      })
    },
    addToCart({ commit }, product) {
      commit('addEvent', {
        event: 'ADD_TO_CART',
        product
      })
    },
    removeFromCart({ commit }, lineItem) {
      commit('addEvent', {
        event: 'REMOVE_FROM_CART',
        lineItem
      })
    },
    checkout({ commit }, cart) {
      commit('addEvent', {
        event: 'CHECKOUT',
        cart
      })
    }
  }
}

export default events
