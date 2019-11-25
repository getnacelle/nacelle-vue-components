const eventProperties = rootState => {
  const timestamp = Date.now()
  const spaceID = rootState && rootState.space ? rootState.space.id : null
  const sessionID = rootState && rootState.user ? rootState.user.sessionID : null
  const customerID =
    rootState && rootState.user ? rootState.user.customerID : null
  const anonymousID = rootState ? rootState.user.anonymousID : null
  const cart =
    rootState && rootState.cart && rootState.cart.lineItems
      ? JSON.stringify(rootState.cart.lineItems)
      : null
  const handle = this ? this.$route.params.handle : null
  let urlParams
  if (process.browser) {
    urlParams = window.location.search
  }

  return {
    timestamp,
    spaceID,
    sessionID,
    customerID,
    anonymousID,
    cart,
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
        ...eventProperties(rootState)
      })
    },
    productView({ commit, rootState }, product) {
      commit('addEvent', {
        eventType: 'PRODUCT_VIEW',
        product,
        ...eventProperties(rootState)
      })
    },
    addToCart({ commit, rootState }, product) {
      commit('addEvent', {
        eventType: 'ADD_TO_CART',
        product,
        ...eventProperties(rootState)
      })
    },
    removeFromCart({ commit, rootState }, lineItem) {
      commit('addEvent', {
        eventType: 'REMOVE_FROM_CART',
        lineItem,
        ...eventProperties(rootState)
      })
    },
    checkoutInit({ commit, rootState }, cart) {
      commit('addEvent', {
        eventType: 'CHECKOUT_INIT',
        cart,
        ...eventProperties(rootState)
      })
    }
  }
}

export default events
