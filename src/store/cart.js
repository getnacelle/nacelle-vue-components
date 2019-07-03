import localforage from 'localforage'
import httpClient from 'axios'

const endpoint = 'https://hailfrequency.com/graphql/v1/space/12345'
const token = 'defAValidToken'

const cart = {
  namespaced: true,
  state: {
    lineItems: [],
    checkoutId: null,
    checkoutComplete: false,
    cartVisible: true,
    freeShippingThreshold: null,
    error: false
  },
  getters: {
    cartSubtotal(state) {
      if (state.lineItems.length >= 1) {
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
      if (getters.cartSubtotal != null && state.freeShippingThreshold) {
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
    setCheckoutCompleteStatus(state, payload) {
      state.checkoutComplete = payload
    },
    showCart(state) {
      state.cartVisible = true
    },
    hideCart(state) {
      state.cartVisible = false
    },
    setFreeShippingThreshold(state, payload) {
      state.freeShippingThreshold = payload
    },
    setCartError(state) {
      state.error = true
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
      localforage.setItem('checkout-id', payload)
    },
    async getCheckoutId(context) {
      let checkoutId = await localforage.getItem('checkout-id')
      if (checkoutId != null) {
        context.commit('setCheckoutId', checkoutId)
        return checkoutId
      }
    },
    async verifyCheckoutStatus(context) {
      await context.dispatch('getCheckoutId')
      if (context.state.checkoutId != null) {
        let checkoutStatus = await httpClient({
          method: 'post',
          url: endpoint,
          headers: {
            'Content-Type': 'application/json',
            'x-nacelle-token': token
          },
          data: {
            query: `query {
              getCheckout(id: "${context.state.checkoutId}") {
                id
                url
                completed
              }
            }`
          }
        }).then(res => res.data.data.getCheckout.completed)
        context.commit('setCheckoutCompleteStatus', checkoutStatus)
      }
    },
    async removeLineItemsIfCheckoutComplete(context) {
      if (context.state.checkoutComplete == true) {
        await localforage.removeItem('line-items')
        await localforage.removeItem('checkout-id')
      }
    },

    async updateLocalCart(context) {
      await context.dispatch('verifyCheckoutStatus')
      await context.dispatch('removeLineItemsIfCheckoutComplete')
      await context.dispatch('getLineItems')
    },

    async processCheckout({ state, getters, dispatch, commit }) {
      let lineItems = []
      let checkoutId
      if (state.checkoutId == null) {
        checkoutId = ''
      } else {
        checkoutId = state.checkoutId
      }
      getters.checkoutLineItems.forEach(item => {
        lineItems.push(`{
          variantId: "${item.variantId}",
          quantity: ${item.quantity}
        }`)
      })

      let processCheckoutObject = await httpClient({
        method: 'post',
        url: endpoint,
        headers: {
          'Content-Type': 'application/json',
          'x-nacelle-token': token
        },
        data: {
          query: `mutation {
          processCheckout(input: {cartItems: ${lineItems}, checkoutId: "${checkoutId}" }) {
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
        .catch(err => {
          console.log(err)
          commit('setCartError')
        })
      if (processCheckoutObject && process.browser) {
        await dispatch('saveCheckoutId', processCheckoutObject.id)
        window.location = processCheckoutObject.url
      }
    }
  }
}

export default cart
