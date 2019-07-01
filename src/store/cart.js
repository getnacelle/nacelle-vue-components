import localforage from 'localforage'
const cart = {
  namespaced: true,
  state: {
    lineItems: []
  },
  getters: {
    cartSubtotal(state) {
      if (state.lineItems.length > 0) {
        let prices = state.lineItems.map(item => {
          return parseFloat(item.price)
        })
        return prices.reduce((acc, price) => {
          return acc + price
        }, 0)
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
    }
  }
}

export default cart
