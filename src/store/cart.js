const cart = {
  namespaced: true,
  state: {
    lineItems: []
  },
  mutations: {
    addLineItemMutation(state, payload) {
      state.lineItems.push(payload)
    },
    removeLineItemMutation() {},
    incremenetLineItemMutation() {},
    decrementLineItemMutation() {},
    localSaveLineItems() {
      console.log('saved line items')
    }
  },
  actions: {
    async addLineItem(context, payload) {
      context.commit('addLineItemMutation', payload)
      context.commit('localSaveLineItems', payload)
    },
    async removeLineItem() {
      console.log('remove line item')
      context.commit('localSaveLineItems')
    },
    async incrementLineItem() {
      console.log('increment line item')
      context.commit('localSaveLineItems')
    },
    async decrementLineItem() {
      console.log('decrement line item')
      context.commit('localSaveLineItems')
    }
  }
}

export default cart
