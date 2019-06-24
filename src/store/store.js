import Vue from 'vue'
import Vuex from 'vuex'
import test from './vuex-store-test'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    test: test
  }
})

export default store
