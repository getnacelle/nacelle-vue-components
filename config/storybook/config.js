/* eslint-disable import/no-extraneous-dependencies */
import { addParameters, configure } from '@storybook/vue'
import Vue from 'vue'
import Vuex from 'vuex'
import '../../src/base-styles.css'
import nacellePlugin from '../../__mocks__/nacelle-vue-plugin'
import nacelleHelpers from '../../__mocks__/nacelle-helpers'
import axiosModule from '../../__mocks__/axios-module'

Vue.use(Vuex)
Vue.use(nacellePlugin)
Vue.use(nacelleHelpers)
Vue.use(axiosModule)

const req = require.context('../../src/stories', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)

addParameters({
  options: {
    showPanel: true,
    panelPosition: 'right'
  }
})
