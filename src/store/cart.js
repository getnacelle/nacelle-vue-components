import localforage from 'localforage'
import axios from 'axios'
import uuid from 'uuidv4'

const compareMetafields = (array1, array2) => {
  const props = ['key', 'value']
  var result = array1.filter(function(o1) {
    // filter out (!) items in result2
    return !array2.some(function(o2) {
      return o1.id === o2.id // assumes unique id
    })
  }).map(function(o) {
    // use reduce to make objects with only the required properties
    // and map to apply this to the filtered array as a whole
    return props.reduce(function(newo, name) {
      newo[name] = o[name]
      return newo
    }, {})
  })
  return result
}

const cart = (options = {}) => {
  const { endpoint = '', token = '' } = options

  return {
    namespaced: true,
    state: {
      lineItems: [],
      checkoutId: null,
      checkoutComplete: false,
      cartVisible: false,
      freeShippingThreshold: null,
      error: null
    },
    getters: {
      quantityTotal (state) {
        if (state.lineItems.length >= 1) {
          return state.lineItems.reduce((acc, item) => acc + item.quantity, 0)
        }

        return 0
      },
      cartSubtotal (state) {
        if (state.lineItems.length >= 1) {
          return state.lineItems.reduce(
            (acc, item) => acc + item.variant.price * item.quantity,
            0
          )
        }

        return 0
      },
      freeShippingThresholdPassed (state, getters) {
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
      amountUntilFreeShipping (state, getters) {
        if (getters.cartSubtotal != null && state.freeShippingThreshold) {
          return state.freeShippingThreshold - getters.cartSubtotal
        }
      },
      checkoutLineItems (state) {
        if (state.lineItems.length > 0) {
          return state.lineItems.map(lineItem => ({
            variantId: lineItem.variant.id,
            quantity: lineItem.quantity,
            metafields: lineItem.metafields
          }))
        } else {
          return []
        }
      },
      checkoutIdForBackend (state) {
        let checkoutId
        if (state.checkoutId == null) {
          checkoutId = ''
        } else {
          checkoutId = state.checkoutId
        }
        return checkoutId
      }
    },
    mutations: {
      addLineItemMutation (state, payload) {
        const index = state.lineItems.findIndex(
          lineItem => lineItem.variant.id === payload.variant.id
        )
        // generate unique id for line
        payload.id = `${payload.variant.id}::${uuid()}`
        console.log('payload', payload)

        if (index === -1) {
          state.lineItems.push(payload)
        } else {
          const matchingVariant = state.lineItems[index]
          const mismatches = compareMetafields(payload.metafields, matchingVariant.metafields)
          if (mismatches) {
            state.lineItems.push(payload)
          } else {
            matchingVariant.quantity++
          }
        }
      },
      removeLineItemMutation (state, payload) {
        const index = state.lineItems.findIndex(
          lineItem => lineItem.id === payload
        )
        state.lineItems.splice(index, 1)
      },
      incrementLineItemMutation (state, payload) {
        const index = state.lineItems.findIndex(
          lineItem => lineItem.id === payload
        )
        if (index !== -1) {
          state.lineItems[index].quantity++
        }
      },
      decrementLineItemMutation (state, payload) {
        const index = state.lineItems.findIndex(
          lineItem => lineItem.id === payload
        )
        if (index !== -1 && state.lineItems[index].quantity >= 1) {
          state.lineItems[index].quantity--
          if (state.lineItems[index].quantity === 0) {
            state.lineItems.splice(index, 1)
          }
        }
      },
      setLineItems (state, payload) {
        state.lineItems.splice(0)
        state.lineItems = payload
      },
      setCheckoutId (state, payload) {
        state.checkoutId = payload
      },
      setCheckoutCompleteStatus (state, payload) {
        state.checkoutComplete = payload
      },
      showCart (state) {
        state.cartVisible = true
      },
      hideCart (state) {
        state.cartVisible = false
      },
      toggleCart (state) {
        state.cartVisible = !state.cartVisible
      },
      setFreeShippingThreshold (state, payload) {
        state.freeShippingThreshold = payload
      },
      setCartError (state, error) {
        state.error = error
      }
    },
    actions: {
      async addLineItem (context, payload) {
        context.commit('addLineItemMutation', payload)
        context.dispatch('saveLineItems', context.state.lineItems)
        // context.commit('showCart')
        if (context.rootState.events) {
          context.dispatch('events/addToCart', payload, { root: true })
        }
      },

      async removeLineItem ({ state, rootState, dispatch, commit }, payload) {
        if (rootState.events) {
          const lineItem = state.lineItems.find(
            item => item.variant.id === payload
          )
          dispatch('events/removeFromCart', lineItem, { root: true })
        }

        commit('removeLineItemMutation', payload)
        dispatch('saveLineItems', state.lineItems)
      },

      async incrementLineItem (context, payload) {
        context.commit('incrementLineItemMutation', payload)
        context.dispatch('saveLineItems', context.state.lineItems)
      },

      async decrementLineItem (context, payload) {
        context.commit('decrementLineItemMutation', payload)
        context.dispatch('saveLineItems', context.state.lineItems)
      },

      async saveLineItems (context) {
        localforage.setItem('line-items', context.state.lineItems)
      },

      async getLineItems (context) {
        const lineItems = await localforage.getItem('line-items')
        if (lineItems != null) {
          context.commit('setLineItems', lineItems)
        }
      },
      async saveCheckoutId (context, payload) {
        localforage.setItem('checkout-id', payload)
      },
      async getCheckoutId (context) {
        const checkoutId = await localforage.getItem('checkout-id')
        if (checkoutId != null) {
          context.commit('setCheckoutId', checkoutId)
          return checkoutId
        }
      },
      async verifyCheckoutStatus (context) {
        await context.dispatch('getCheckoutId')
        if (context.state.checkoutId != null) {
          const checkoutStatus = await axios({
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
      async removeLineItemsIfCheckoutComplete (context) {
        if (context.state.checkoutComplete === true) {
          await localforage.removeItem('line-items')
          await localforage.removeItem('checkout-id')
        }
      },

      async updateLocalCart (context) {
        await context.dispatch('verifyCheckoutStatus')
        await context.dispatch('removeLineItemsIfCheckoutComplete')
        await context.dispatch('getLineItems')
      },

      async createCheckoutArray ({ getters }) {
        let lineItems = ''
        getters.checkoutLineItems.forEach(item => {
          lineItems += `{
            variantId: "${item.variantId}",
            quantity: ${item.quantity}
          }`
        })
        return lineItems
      },

      async getCheckoutIdForBackend ({ state }) {
        let checkoutId
        if (state.checkoutId == null) {
          checkoutId = ''
        } else {
          checkoutId = state.checkoutId
        }
        return checkoutId
      },

      async getLinkerParam () {
        return new Promise((resolve, reject) => {
          ga((tracker) => resolve(tracker.get('linkerParam')))
        })
      },

      async saveAndRedirect ({ dispatch, rootState }, payload) {
        if (payload && process.browser) {
          await dispatch('saveCheckoutId', payload.id)
          let url
          const linkerParam = await dispatch('getLinkerParam')
          if (payload.url.includes('?')) {
            url = `${payload.url}&c=${JSON.stringify(rootState.user.userData)}&${linkerParam}`
          } else {
            url = `${payload.url}?c=${JSON.stringify(rootState.user.userData)}&${linkerParam}`
          }

          window.location = url
        }
      },

      async processCheckout (
        { state, dispatch, commit, rootState, context },
        payload
      ) {
        // let lineItems = await dispatch('createCheckoutArray')
        // let checkoutId = await dispatch('getCheckoutIdForBackend')

        if (rootState.events) {
          dispatch('events/checkout', state.lineItems, { root: true })
        }

        await dispatch('saveAndRedirect', payload)
      }
    }
  }
}

export default cart
