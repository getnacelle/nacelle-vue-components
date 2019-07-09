const menu = {
  namespaced: true,
  state: {
    menuVisible: false
  },
  mutations: {
    openMenu(state) {
      state.menuVisible = true
    },
    toggleShowMenu(state) {
      state.menuVisible = !state.menuVisible
    },
    disableMenu(state) {
      state.menuVisible = false
    }
  }
}

export default menu
