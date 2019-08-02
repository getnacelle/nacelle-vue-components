const product = {
  namespaced: true,
  state: {
    product: null,
    selectedOptions: [],
    selectedVariant: null,
    optionsModalVisible: false,
    removeItemsModalVisible: false
  },
  mutations: {
    setProduct(state, payload) {
      state.product = payload
    },
    setSelectedOptions(state, selectedOption) {
      let searchOptions = state.selectedOptions.filter(option => {
        return option.name == selectedOption.name
      })
      if (searchOptions.length == 0) {
        state.selectedOptions.push(selectedOption)
      } else {
        let index = state.selectedOptions.findIndex(option => {
          return option.name == selectedOption.name
        })
        state.selectedOptions.splice(index, 1, selectedOption)
      }
    },
    setVariant(state, payload) {
      state.selectedVariant = payload
    },
    clearSelectedOptions(state) {
      state.selectedOptions = []
    },
    clearProduct(state) {
      state.product = null
    },
    clearSelectedVariant(state) {
      state.selectedVariant = null
    },
    showOptionsModal(state) {
      state.optionsModalVisible = true
    },
    hideOptionsModal(state) {
      state.optionsModalVisible = false
    },
    showRemoveItemsModal(state) {
      state.removeItemsModalVisible = true
    },
    hideRemoveItemsModal(state) {
      state.removeItemsModalVisible = false
    }
  },
  getters: {
    productOptions(state) {
      if (state.product) {
        return state.product.options
      }
    },
    onlyOneOption(state) {
      if (
        state.product &&
        state.product.options &&
        state.product.options.length == 1 &&
        state.product.options[0].values.length == 1
      ) {
        return true
      } else {
        return false
      }
    },
    allOptionsSelected(state) {
      if (
        state.product &&
        state.product.options &&
        state.selectedOptions.length == state.product.options.length
      ) {
        return true
      } else if (
        state.product &&
        state.product.options &&
        state.product.options.length == 1 &&
        state.product.options[0].values.length == 1
      ) {
        return true
      } else {
        return false
      }
    }
  },
  actions: {
    clearAll(context) {
      context.commit('clearSelectedOptions')
      context.commit('clearProduct')
      context.commit('clearSelectedVariant')
      context.commit('hideOptionsModal')
    },
    confirmSelection(context) {
      if (context.state.product && context.state.selectedVariant) {
        let lineItem = {
          image: context.state.product.featuredMedia,
          title: context.state.product.title,
          variant: context.state.selectedVariant,
          quantity: 1,
          productId: context.state.product.id,
          handle: context.state.product.handle
        }
        context.dispatch('cart/addLineItem', lineItem, { root: true })
        context.dispatch('clearAll')
      }
    }
  }
}

export default product
