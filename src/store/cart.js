import localforage from 'localforage'
import httpClient from 'axios'

const cart = {
  namespaced: true,
  state: {
    lineItems: [],
    checkoutId: null,
    cartVisible: true,
    freeShippingThreshold: null
  },
  getters: {
    cartSubtotal(state) {
      if (state.lineItems.length > 0) {
        return state.lineItems.reduce((acc, item) => {
          return acc + item.price * item.quantity
        }, 0)
      } else {
        return 0
      }
    },
    freeShippingThresholdPassed(state, getters) {
      if (
        getters.cartSubtotal &&
        state.freeShippingThreshold &&
        getters.cartSubtotal > state.freeShippingThreshold
      ) {
        return true
      } else {
        return false
      }
    },
    amountUntilFreeShipping(state, getters) {
      if (getters.cartSubtotal && state.freeShippingThreshold) {
        return state.freeShippingThreshold - getters.cartSubtotal
      }
    },
    checkoutLineItems(state) {
      if (state.lineItems.length > 0) {
        return state.lineItems.map(lineItem => {
          return {
            variantId: lineItem.variant.id,
            quantity: lineItem.quantity
          }
        })
      } else {
        return []
      }
    }
  },
  mutations: {
    addLineItemMutation(state, payload) {
      let index = state.lineItems.findIndex(lineItem => {
        return lineItem.variant.id == payload.variant.id
      })
      if (index == -1) {
        state.lineItems.push(payload)
      } else {
        state.lineItems[index].quantity++
      }
    },
    removeLineItemMutation(state, payload) {
      let index = state.lineItems.findIndex(lineItem => {
        return lineItem.variant.id == payload
      })
      state.lineItems.splice(index, 1)
    },
    incrementLineItemMutation(state, payload) {
      let index = state.lineItems.findIndex(lineItem => {
        return lineItem.variant.id == payload
      })
      if (index != -1) {
        state.lineItems[index].quantity++
      }
    },
    decrementLineItemMutation(state, payload) {
      let index = state.lineItems.findIndex(lineItem => {
        return lineItem.variant.id == payload
      })
      if (index != -1 && state.lineItems[index].quantity >= 1) {
        state.lineItems[index].quantity--
        if (state.lineItems[index].quantity == 0) {
          state.lineItems.splice(index, 1)
        }
      }
    },
    setLineItems(state, payload) {
      state.lineItems.splice(0)
      state.lineItems = payload
    },
    setCheckoutId(state, payload) {
      state.checkoutId = payload
    },
    showCart(state) {
      state.cartVisible = true
    },
    hideCart(state) {
      state.cartVisible = false
    },
    setFreeShippingThreshold(state, payload) {
      state.freeShippingThreshold = payload
    }
  },
  actions: {
    async addLineItem(context, payload) {
      context.commit('addLineItemMutation', payload)
      context.dispatch('saveLineItems', context.state.lineItems)
    },

    async removeLineItem(context, payload) {
      context.commit('removeLineItemMutation', payload)
      context.dispatch('saveLineItems', context.state.lineItems)
    },

    async incrementLineItem(context, payload) {
      context.commit('incrementLineItemMutation', payload)
      context.dispatch('saveLineItems', context.state.lineItems)
    },

    async decrementLineItem(context, payload) {
      context.commit('decrementLineItemMutation', payload)
      context.dispatch('saveLineItems', context.state.lineItems)
    },

    async saveLineItems(context) {
      localforage.setItem('line-items', context.state.lineItems)
    },

    async getLineItems(context) {
      let lineItems = await localforage.getItem('line-items')
      if (lineItems != null) {
        context.commit('setLineItems', lineItems)
      }
    },
    async saveCheckoutId(context, payload) {
      localforage.setItems('checkout-id', payload)
    },
    async getCheckoutId(context) {
      let checkoutId = localforage.getItem('checkout-id')
      if (checkoutId != null) {
        context.commit('setCheckoutId', checkoutId)
      }
    },
    async processCheckout({ getters }) {
      let processCheckoutObject = await httpClient({
        method: 'post',
        url: 'https://hailfrequency.com/graphql/v1/space/12345',
        headers: {
          'Content-Type': 'application/json',
          'x-nacelle-token': 'defAValidToken'
        },
        data: {
          query: `mutation {
          processCheckout(input: {cartItems: [{variantId: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDIyMDAwOQ==", quantity: 1}]}) {
            id
            url
            completed
          }
        }`
        }
      })
        .then(res => {
          return res.data.data.processCheckout
        })
        .catch(err => console.log(err))
      if (processCheckoutObject && process.browser) {
        window.location = processCheckoutObject.url
      }
    }
  }
}

export default cart
