const menu = {
  namespaced: true,
  state: {
    modalOpen: false,
    modalContext: null,
    modalData: null
  },
  mutations: {
    openModal(state) {
      state.modalOpen = true
    },
    closeModal(state) {
      state.modalOpen = false
    },
    setModalContext(state, payload) {
      state.modalContext = payload
    },
    setModalData(state, payload) {
      state.modalData = payload
    }
  }
}

export default menu
