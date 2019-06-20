import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    test: {
      namespaced: true,
      state: {
        testData: 'hi'
      }
    }
  }
})

export default store
