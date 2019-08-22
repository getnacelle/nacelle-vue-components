const product = {
  namespaced: true,
  state: {
    product: undefined,
    selectedVariant: undefined
  },
  getters: {
    currentVariant(state) {
      if (state.selectedVariant) {
        return state.selectedVariant
      }

      if (
        state.product &&
        state.product.variants &&
        state.product.variants.length > 0
      ) {
        return state.product.variants[0]
      }

      return undefined
    }
  },
  mutations: {
    setProduct(state, payload) {
      state.product = payload
    },
    setSelectedVariant(state, payload) {
      if (state.product && state.product.variants && payload && payload.id) {
        const variant = state.product.variants.find(
          variant => variant.id === payload.id
        )
        state.selectedVariant = variant
      }
    },
    setSelectedVariantById(state, payload) {
      if (state.product && state.product.variants && payload) {
        const variant = state.product.variants.find(
          variant => variant.id === payload
        )
        state.selectedVariant = variant
      }
    }
  }
}

export default product
