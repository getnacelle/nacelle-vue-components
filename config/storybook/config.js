/* eslint-disable import/no-extraneous-dependencies */
import { configure } from '@storybook/vue'
import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
import '../../src/base-styles.css'
Vue.use(Vuex)
Vue.use(VueCookies)

const req = require.context('../../src/stories', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
