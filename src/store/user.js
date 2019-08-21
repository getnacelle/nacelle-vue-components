const user = {
  namespaced: true,
  state: {
    userData: null
  },
  mutations: {
    setUserData(state, payload) {
      state.userData = payload
    }
  }
}

export default user
