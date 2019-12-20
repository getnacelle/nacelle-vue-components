import axios from 'axios'

const search = {
  namespaced: true,
  state: {
    query: null,
    autocompleteVisible: false,
    filtersCleared: false,
    searchData: {},
    loadedData: false,
    searchLoading: false
  },
  getters: {
    queryOrigin(state) {
      if (state.query && state.query.origin) {
        return state.query.origin
      }

      return undefined
    },
    hasProductData(state) {
      return (
        state.searchData &&
        state.searchData.products &&
        state.searchData.products.length > 0
      )
    },
    productData(state) {
      if (
        state.searchData &&
        state.searchData.products &&
        state.searchData.products.length > 0
      ) {
        return state.searchData.products
      }

      return []
    }
  },
  mutations: {
    setQuery(state, query) {
      state.query = query
    },

    setAutocompleteVisible(state) {
      state.autocompleteVisible = true
    },

    setAutocompleteNotVisible(state) {
      state.autocompleteVisible = false
    },

    setFiltersCleared(state) {
      state.filtersCleared = true
    },

    setFiltersNotCleared(state) {
      state.filtersCleared = false
    },

    setSearchData(state, data) {
      state.searchData = {
        ...state.searchData,
        ...data
      }
    },

    dataHasLoaded(state) {
      state.loadedData = true
    },

    dataNotLoaded(state) {
      state.loadedData = false
    },

    isSearching(state) {
      state.searchLoading = true
    },

    isNotSearching(state) {
      state.searchLoading = false
    }
  },

  actions: {
    getProductData({ commit, getters }) {
      if (!getters.hasProductData) {
        commit('dataNotLoaded')
        commit('isSearching')

        axios
          .get('/data/search.json')
          .then(res => {
            if (res && res.data) {
              commit('dataHasLoaded')
              commit('isNotSearching')

              const products = res.data
                .filter(product => product && product.title && product.variants)

              commit('setSearchData', { products })
            }
          })
          .catch(err => {
            console.log(err)
            return err
          })
      }
    }
  }
}

export default search
