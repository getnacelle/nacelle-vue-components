const eventProperties = rootState => {
  let handle
  if (this.$route.params.handle) {
    handle = this.$route.params.handle
  }
  let urlParams
  if (process.browser) {
    urlParams = window.location.search
  }

  return {
    timestamp: Date.now(),
    spaceID: rootState.space.id,
    sessionID: rootState.user.sessionID,
    customerID: rootState.user.customerID,
    anonymousID: rootState.user.anonymousID,
    cart: JSON.stringify(rootState.cart.lineItems),
    handle,
    urlParams
  }
}
const events = {
  namespaced: true,
  state: {
    log: []
  },
  mutations: {
    addEvent(state, event) {
      state.log.push(event)
    }
  },
  actions: {
    pageView({ commit, rootState }, page) {
      commit('addEvent', {
        eventType: 'PAGE_VIEW',
        page,
        ...eventProperties()
      })
    },
    productView({ commit, rootState }, product) {
      commit('addEvent', {
        eventType: 'PRODUCT_VIEW',
        product,
        ...eventProperties()
      })
    },
    addToCart({ commit, rootState }, product) {
      commit('addEvent', {
        eventType: 'ADD_TO_CART',
        product,
        ...eventProperties()
      })
    },
    removeFromCart({ commit, rootState }, lineItem) {
      commit('addEvent', {
        eventType: 'REMOVE_FROM_CART',
        lineItem,
        ...eventProperties()
      })
    },
    checkout({ commit, rootState }, cart) {
      commit('addEvent', {
        eventType: 'CHECKOUT',
        cart,
        ...eventProperties()
      })
    }
  }
}

export default events
