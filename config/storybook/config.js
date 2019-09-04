/* eslint-disable import/no-extraneous-dependencies */
import { addParameters, configure } from '@storybook/vue'
import Vue from 'vue'
import Vuex from 'vuex'
import '../../src/base-styles.css'
Vue.use(Vuex)

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
