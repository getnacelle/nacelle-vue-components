const menu = {
  namespaced: true,
  state: {
    activeProductId: null,
    options: null,
    selectedOptions: [],
    addToCartEnabled: false
  },
  mutations: {
    setProductOptions(state, payload) {
      state.options = payload
    },
    enableAddToCart(state) {
      state.addToCartEnabled = true
    },
    disableAddToCart(state) {
      state.addToCartDisabled = true
    },
    setActiveProductId(state, payload) {
      state.activeProductId = payload
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
    clearSelectedOptions(state) {
      state.selectedOptions = []
    }
  },
  getters: {
    allOptionsSelected(state) {
      if (
        state.options &&
        state.selectedOptions.length == state.options.length
      ) {
        return true
      } else if (
        state.options &&
        state.options.length == 1 &&
        state.options[0].values.length == 1
      ) {
        return true
      } else {
        return false
      }
    }
  }
}

export default menu
