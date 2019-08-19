const product = {
  namespaced: true,
  state: {
    userData: null
  },
  mutations: {
    setUserData(state, userData) {
      state.userData = userData
    }
  }
}

export default product
