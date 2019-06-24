export default {
  namespaced: true,
  state: {
    hi: 'testings'
  },
  actions: {
    async FETCH() {
      console.log('calling FETCH action')
    }
  }
}
