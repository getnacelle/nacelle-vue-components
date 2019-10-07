/* eslint-disable import/no-extraneous-dependencies */
import { addParameters, configure } from '@storybook/vue'
import Vue from 'vue'
import Vuex from 'vuex'
import '../../src/base-styles.css'
import nacellePlugin from '../../__mocks__/nacelle-vue-plugin'

Vue.use(Vuex)
Vue.use(nacellePlugin)

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
